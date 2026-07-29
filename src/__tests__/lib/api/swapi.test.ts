import {
  getFilmsByUrls,
  getPeople,
  getPersonById,
  getStarshipsByUrls,
  getVehiclesByUrls,
  searchPeople,
} from "@/lib/api/swapi";

function mockFetchOnce(body: unknown) {
  return jest.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(body),
  });
}

describe("swapi data layer", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("getPeople requests the given page of the people endpoint", async () => {
    const page = { count: 82, next: null, previous: null, results: [] };
    global.fetch = mockFetchOnce(page) as unknown as typeof fetch;

    const result = await getPeople(3);

    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0];
    expect(calledUrl).toContain("/people/?page=3");
    expect(result).toEqual(page);
  });

  it("getPeople defaults to page 1", async () => {
    global.fetch = mockFetchOnce({
      count: 0,
      next: null,
      previous: null,
      results: [],
    }) as unknown as typeof fetch;

    await getPeople();

    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0];
    expect(calledUrl).toContain("page=1");
  });

  it("getPersonById requests the person by id", async () => {
    const person = { name: "Luke Skywalker" };
    global.fetch = mockFetchOnce(person) as unknown as typeof fetch;

    const result = await getPersonById("1");

    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0];
    expect(calledUrl).toContain("/people/1/");
    expect(result).toEqual(person);
  });

  it("searchPeople URL-encodes the query and includes the page", async () => {
    global.fetch = mockFetchOnce({
      count: 1,
      next: null,
      previous: null,
      results: [],
    }) as unknown as typeof fetch;

    await searchPeople("luke skywalker", 2);

    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0];
    expect(calledUrl).toContain("search=luke%20skywalker");
    expect(calledUrl).toContain("page=2");
  });

  it("getFilmsByUrls resolves multiple film URLs in parallel", async () => {
    const filmA = { title: "A New Hope" };
    const filmB = { title: "The Empire Strikes Back" };
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(filmA) })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(filmB),
      }) as unknown as typeof fetch;

    const result = await getFilmsByUrls([
      "https://swapi.py4e.com/api/films/1/",
      "https://swapi.py4e.com/api/films/2/",
    ]);

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(result).toEqual([filmA, filmB]);
  });

  it("getFilmsByUrls returns an empty array for no URLs without fetching", async () => {
    global.fetch = jest.fn() as unknown as typeof fetch;

    const result = await getFilmsByUrls([]);

    expect(result).toEqual([]);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("getVehiclesByUrls resolves vehicle URLs", async () => {
    const vehicle = { name: "Snowspeeder" };
    global.fetch = mockFetchOnce(vehicle) as unknown as typeof fetch;

    const result = await getVehiclesByUrls([
      "https://swapi.py4e.com/api/vehicles/1/",
    ]);

    expect(result).toEqual([vehicle]);
  });

  it("getStarshipsByUrls resolves starship URLs", async () => {
    const starship = { name: "X-wing" };
    global.fetch = mockFetchOnce(starship) as unknown as typeof fetch;

    const result = await getStarshipsByUrls([
      "https://swapi.py4e.com/api/starships/1/",
    ]);

    expect(result).toEqual([starship]);
  });
});
