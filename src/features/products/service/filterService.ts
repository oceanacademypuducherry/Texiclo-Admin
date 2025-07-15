import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAPI } from "../../../services";

export const GET_FILTER_OPTIONS = createAsyncThunk(
  "filters/getFilterOptions",
  async (_, thunkAPI) => {
    try {
      const response = await AdminAPI.get("/product/filter-options/");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to fetch filter options" },
      );
    }
  },
);
