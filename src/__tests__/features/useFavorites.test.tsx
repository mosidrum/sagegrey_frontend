import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { FavoritesProvider } from "@/features/favorites/FavoritesContext";
import { useFavorites } from "@/features/favorites/useFavorites";

const STORAGE_KEY = "swapi:favorites";

function wrapper({ children }: { children: ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}

describe("useFavorites", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("throws when used outside a FavoritesProvider", () => {
    // Suppress the expected React error-boundary console.error noise.
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useFavorites())).toThrow(
      "useFavorites must be used within a FavoritesProvider",
    );
    spy.mockRestore();
  });

  it("starts empty when nothing is persisted", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    expect(result.current.favorites).toEqual([]);
  });

  it("adds a favorite", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite({ id: "1", name: "Luke Skywalker" });
    });

    expect(result.current.favorites).toEqual([
      { id: "1", name: "Luke Skywalker" },
    ]);
    expect(result.current.isFavorite("1")).toBe(true);
  });

  it("does not add a duplicate favorite", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite({ id: "1", name: "Luke Skywalker" });
      result.current.addFavorite({ id: "1", name: "Luke Skywalker" });
    });

    expect(result.current.favorites).toHaveLength(1);
  });

  it("removes a favorite", () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite({ id: "1", name: "Luke Skywalker" });
    });
    act(() => {
      result.current.removeFavorite("1");
    });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.isFavorite("1")).toBe(false);
  });

  it("persists favorites to localStorage and loads them on next mount", async () => {
    const { result, unmount } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite({ id: "1", name: "Luke Skywalker" });
    });

    await waitFor(() => {
      expect(
        JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]"),
      ).toEqual([{ id: "1", name: "Luke Skywalker" }]);
    });

    unmount();

    const { result: result2 } = renderHook(() => useFavorites(), { wrapper });
    await waitFor(() => {
      expect(result2.current.favorites).toEqual([
        { id: "1", name: "Luke Skywalker" },
      ]);
    });
  });
});
