import { createAsyncThunk } from "@reduxjs/toolkit";
import { SizesData } from "../../size";
import { AdminAPI } from "../../../services";
import { GsmsData } from "../../gsm";

export const GET_OPTIONS_SIZE = createAsyncThunk<
  SizesData[],
  void,
  { rejectValue: { message: string } }
>("size/getAll", async (_, thunkAPI) => {
  try {
    const response = await AdminAPI.get("/size/");
    return response.data.data.map((item: any) => ({
      _id: item._id,
      label: item.label,
    }));
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to fetch Sizes" },
    );
  }
});
export const GET_OPTIONS_GSM = createAsyncThunk<
  GsmsData[],
  void,
  { rejectValue: { message: string } }
>("gsm/getAll", async (_, thunkAPI) => {
  try {
    const response = await AdminAPI.get("/gsm/");
    return response.data.data.map((item: any) => ({
      _id: item._id,
      value: item.value,
    }));
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to fetch GSMs" },
    );
  }
});

export const GET_OPTIONS_CATEGORY = createAsyncThunk(
  "category/get",
  async (_, thunkAPI) => {
    try {
      const response = await AdminAPI.get(`category/get/`);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to fetch category" },
      );
    }
  },
);

export const GET_OPTIONS_COLLECTIONTYPE = createAsyncThunk(
  "collectionType/get",
  async (_, thunkAPI) => {
    try {
      const response = await AdminAPI.get(`collectionType/get/`);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to fetch collections" },
      );
    }
  },
);
