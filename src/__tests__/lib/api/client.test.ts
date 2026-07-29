import { ApiError, fetchJson } from "@/lib/api/client";

describe("fetchJson", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("returns parsed JSON on a successful response", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ name: "Luke Skywalker" }),
    }) as unknown as typeof fetch;

    const result = await fetchJson<{ name: string }>("https://example.com/people/1/");

    expect(result).toEqual({ name: "Luke Skywalker" });
  });

  it("throws an ApiError with the HTTP status on a non-2xx response", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    }) as unknown as typeof fetch;

    await expect(fetchJson("https://example.com/people/999/")).rejects.toMatchObject({
      name: "ApiError",
      status: 404,
      statusText: "Not Found",
    });
  });

  it("throws an ApiError when the request itself fails (network error)", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network down")) as unknown as typeof fetch;

    await expect(fetchJson("https://example.com/people/1/")).rejects.toMatchObject({
      name: "ApiError",
      status: 0,
      statusText: "Network Error",
      message: "Network down",
    });
  });

  it("re-throws an existing ApiError as-is rather than wrapping it", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Server Error",
    }) as unknown as typeof fetch;

    try {
      await fetchJson("https://example.com/people/1/");
      throw new Error("expected fetchJson to reject");
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).status).toBe(500);
    }
  });
});
