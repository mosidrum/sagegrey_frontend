import { act, renderHook } from "@testing-library/react";
import { useSearchHistory } from "@/features/search/useSearchHistory";

const STORAGE_KEY = "swapi:search-history";

describe("useSearchHistory", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts empty when nothing is persisted", () => {
    const { result } = renderHook(() => useSearchHistory());
    expect(result.current.history).toEqual([]);
  });

  it("adds a term to the front of the history", () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addTerm("luke");
    });

    expect(result.current.history).toEqual(["luke"]);
  });

  it("ignores blank/whitespace-only terms", () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addTerm("   ");
    });

    expect(result.current.history).toEqual([]);
  });

  it("dedupes a re-added term, moving it to the front", () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addTerm("luke");
      result.current.addTerm("leia");
      result.current.addTerm("luke");
    });

    expect(result.current.history).toEqual(["luke", "leia"]);
  });

  it("caps history at 8 entries, most-recent-first", () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      for (let i = 1; i <= 10; i++) {
        result.current.addTerm(`term-${i}`);
      }
    });

    expect(result.current.history).toHaveLength(8);
    expect(result.current.history[0]).toBe("term-10");
    expect(result.current.history).not.toContain("term-1");
    expect(result.current.history).not.toContain("term-2");
  });

  it("clears history", () => {
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addTerm("luke");
    });
    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.history).toEqual([]);
  });

  it("persists history to localStorage and loads it on next mount", () => {
    const { result, unmount } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addTerm("luke");
    });

    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]")).toEqual([
      "luke",
    ]);

    unmount();

    const { result: result2 } = renderHook(() => useSearchHistory());
    expect(result2.current.history).toEqual(["luke"]);
  });

  // Regression test: addTerm/clearHistory must be referentially stable
  // across re-renders. Before this was fixed, addTerm was a new function
  // on every render, and a consumer that called addTerm inside a
  // useEffect keyed on addTerm's identity (Header's search-navigation
  // effect) would re-run its effect every time addTerm ran, causing an
  // infinite render loop ("Maximum update depth exceeded").
  it("keeps addTerm and clearHistory referentially stable across renders", () => {
    const { result, rerender } = renderHook(() => useSearchHistory());

    const firstAddTerm = result.current.addTerm;
    const firstClearHistory = result.current.clearHistory;

    rerender();

    expect(result.current.addTerm).toBe(firstAddTerm);
    expect(result.current.clearHistory).toBe(firstClearHistory);

    act(() => {
      result.current.addTerm("luke");
    });

    // Still stable after a state-changing call (this is the exact
    // interaction that triggered the infinite loop).
    expect(result.current.addTerm).toBe(firstAddTerm);
  });
});
