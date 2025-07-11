import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAPI } from "../../../services";
import { SizesData } from "../redux";

export const GET_SIZE = createAsyncThunk<
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

export const ADD_SIZE = createAsyncThunk<
  SizesData,
  string,
  { rejectValue: { message: string } }
>("size/add", async (label, thunkAPI) => {
  try {
    const response = await AdminAPI.post("/size/", {
      label,
    });
    return {
      _id: response.data.data._id,
      label: response.data.data.label,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to add Size" },
    );
  }
});

export const UPDATE_SIZE = createAsyncThunk<
  SizesData,
  { id: string; label: string },
  { rejectValue: { message: string } }
>("size/update", async ({ id, label }, thunkAPI) => {
  try {
    const response = await AdminAPI.put(`/size/${id}`, {
      label,
    });
    return {
      _id: response.data.data._id,
      label: response.data.data.label,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to update Size" },
    );
  }
});

export const DELETE_SIZE = createAsyncThunk<
  string,
  string,
  { rejectValue: { message: string } }
>("size/delete", async (id, thunkAPI) => {
  try {
    await AdminAPI.delete(`/size/${id}`);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to delete Size" },
    );
  }
});
