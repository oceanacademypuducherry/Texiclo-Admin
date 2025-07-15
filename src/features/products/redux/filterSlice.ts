import { createSlice } from "@reduxjs/toolkit";
import { GET_FILTER_OPTIONS } from "../service";

interface FilterState {
  categories: { _id: string; name: string }[];
  collections: { _id: string; name: string }[];
  Filterloading: boolean;
  error: string | null;
}

const initialState: FilterState = {
  categories: [],
  collections: [],
  Filterloading: false,
  error: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GET_FILTER_OPTIONS.pending, (state) => {
        state.Filterloading = true;
        state.error = null;
      })
      .addCase(GET_FILTER_OPTIONS.fulfilled, (state, action) => {
        state.Filterloading = false;
        state.categories = action.payload.categoryData || [];
        state.collections = action.payload.collection || [];
      })
      .addCase(GET_FILTER_OPTIONS.rejected, (state, action: any) => {
        state.Filterloading = false;
        state.error =
          action.payload?.message || "Failed to fetch filter options";
      });
  },
});

export const filterReducer = filterSlice.reducer;
