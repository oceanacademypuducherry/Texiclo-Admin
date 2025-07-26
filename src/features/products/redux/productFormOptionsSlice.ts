import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  GET_OPTIONS_CATEGORY,
  GET_OPTIONS_COLLECTIONTYPE,
  GET_OPTIONS_GSM,
  GET_OPTIONS_SIZE,
} from "../service/productOptionsService";
import { CategoryData } from "../../category";
import { CollectionsData } from "../../collectiontype";

export interface SizesData {
  _id: string;
  label: string;
}

export interface GsmsData {
  _id: string;
  value: string;
}

export interface OptionState {
  sizes: SizesData[];
  gsms: GsmsData[];
  categories: any[];
  collections: any[];
  loading: boolean;
  error: string | null;
}

const initialState: OptionState = {
  sizes: [],
  gsms: [],
  categories: [],
  collections: [],
  loading: false,
  error: null,
};

const productOptionsSlice = createSlice({
  name: "productOptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending
      .addMatcher(
        isAnyOf(
          GET_OPTIONS_SIZE.pending,
          GET_OPTIONS_GSM.pending,
          GET_OPTIONS_CATEGORY.pending,
          GET_OPTIONS_COLLECTIONTYPE.pending,
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      // Fulfilled
      .addMatcher(
        isAnyOf(
          GET_OPTIONS_SIZE.fulfilled,
          GET_OPTIONS_GSM.fulfilled,
          GET_OPTIONS_CATEGORY.fulfilled,
          GET_OPTIONS_COLLECTIONTYPE.fulfilled,
        ),
        (state, action) => {
          state.loading = false;
          if (action.type === GET_OPTIONS_SIZE.fulfilled.type)
            state.sizes = action.payload.map((size: SizesData) => {
              return { label: size.label, value: size._id };
            });
          else if (action.type === GET_OPTIONS_GSM.fulfilled.type)
            state.gsms = action.payload.map((d: any) => {
              return { ...d,gsmId: d._id, amount: undefined };
            });
          else if (action.type === GET_OPTIONS_CATEGORY.fulfilled.type)
            state.categories = action.payload.data.map((cat: CategoryData) => {
              return { value: cat._id, label: cat.name };
            });
          else if (action.type === GET_OPTIONS_COLLECTIONTYPE.fulfilled.type)
            state.collections = action.payload.data.map(
              (cat: CollectionsData) => {
                return { value: cat._id, label: cat.name };
              },
            );
        },
      )
      // Rejected
      .addMatcher(
        isAnyOf(
          GET_OPTIONS_SIZE.rejected,
          GET_OPTIONS_GSM.rejected,
          GET_OPTIONS_CATEGORY.rejected,
          GET_OPTIONS_COLLECTIONTYPE.rejected,
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to fetch data";
        },
      );
  },
});

export const productOptionsReducer = productOptionsSlice.reducer;
