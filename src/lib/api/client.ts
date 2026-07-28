/**
 * Generic fetch client with typed error handling
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(
      `HTTP error: ${response.status} ${response.statusText}`,
      response.status,
      response.statusText,
    );
  }

  return response.json() as Promise<T>;
}
