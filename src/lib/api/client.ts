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
  try {
    const response = await fetch(url, {
      cache: "no-store", // Disable caching to avoid stale data issues
      next: { revalidate: 0 }, // Force fresh data on each request
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error: ${response.status} ${response.statusText}`,
        response.status,
        response.statusText,
      );
    }

    return response.json() as Promise<T>;
  } catch (error) {
    // Handle network errors or JSON parsing errors
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other fetch errors
    throw new ApiError(
      error instanceof Error ? error.message : "Failed to fetch data",
      0,
      "Network Error",
    );
  }
}
