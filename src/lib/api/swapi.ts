/**
 * SWAPI data layer - pure, fully-typed API functions
 */

import type { Film, PaginatedResponse, Person } from "@/types/swapi";
import { fetchJson } from "./client";

const SWAPI_BASE_URL = "https://swapi.py4e.com/api";

/**
 * Get a paginated list of people
 */
export async function getPeople(
  page: number = 1,
): Promise<PaginatedResponse<Person>> {
  return fetchJson<PaginatedResponse<Person>>(
    `${SWAPI_BASE_URL}/people/?page=${page}`,
  );
}

/**
 * Get a single person by ID
 */
export async function getPersonById(id: string): Promise<Person> {
  return fetchJson<Person>(`${SWAPI_BASE_URL}/people/${id}/`);
}

/**
 * Search people by name
 */
export async function searchPeople(
  query: string,
  page: number = 1,
): Promise<PaginatedResponse<Person>> {
  const encodedQuery = encodeURIComponent(query);
  return fetchJson<PaginatedResponse<Person>>(
    `${SWAPI_BASE_URL}/people/?search=${encodedQuery}&page=${page}`,
  );
}

/**
 * Resolve multiple film URLs in parallel
 */
export async function getFilmsByUrls(urls: string[]): Promise<Film[]> {
  const filmPromises = urls.map((url) => fetchJson<Film>(url));
  return Promise.all(filmPromises);
}
