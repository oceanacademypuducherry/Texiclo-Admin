import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAPI } from "../../../services";

export const GET_ALL_PRODUCTS = createAsyncThunk<
  any, 
  number,
  { rejectValue: { message: string } } 
>("product/getAll", async (page = 1, thunkAPI) => {
  try {
    const response = await AdminAPI.get(`/product/get/${page}`);
    return response.data; 
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to fetch products" },
    );
  }
});

export const GET_PRODUCT_BY_ID = createAsyncThunk<
  any,
  string,
  { rejectValue: { message: string } }
>("product/getOne", async (id, thunkAPI) => {
  try {
    const response = await AdminAPI.get(`/product/${id}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to fetch product" },
    );
  }
});
