import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const API_KEY = "3ce38d06cc5f12f46490e99d7965b977";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
};

type MovieState = {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
};

const initialState: MovieState = {
  movie: null,
  loading: false,
  error: null,
};

// Async thunk to fetch movie details
export const fetchMovieDetails = createAsyncThunk(
  "movie/fetchDetails",
  async (id: string) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: { api_key: API_KEY },
    });
    return res.data as Movie;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearMovie: (state) => {
      state.movie = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load movie";
      });
  },
});

export const { clearMovie } = movieSlice.actions;
export default movieSlice.reducer;
