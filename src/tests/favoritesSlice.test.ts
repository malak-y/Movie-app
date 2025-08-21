import favoritesReducer, { addFavorite, removeFavorite, clearFavorites } from "../features/favoritesSlice";

const movie = { id: 1, title: "Inception", poster_path: null, vote_average: 9, release_date: "2010-07-16", vote_count: 100 };

describe("favoritesSlice", () => {
  test("should return the initial state", () => {
    expect(favoritesReducer(undefined, { type: "" })).toEqual({ movies: [] });
  });

  it("should add a favorite movie", () => {
    const state = favoritesReducer({ movies: [] }, addFavorite(movie));
    expect(state.movies.length).toBe(1);
    expect(state.movies[0].title).toBe("Inception");
  });

  it("should remove a favorite movie", () => {
    const state = favoritesReducer({ movies: [movie] }, removeFavorite(1));
    expect(state.movies).toEqual([]);
  });

  it("should clear all favorites", () => {
    const state = favoritesReducer({ movies: [movie] }, clearFavorites());
    expect(state.movies).toEqual([]);
  });
});
