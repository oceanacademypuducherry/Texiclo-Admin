import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAPI } from "../../../services";
import { GsmsData } from "../redux";

export const GET_GSM = createAsyncThunk<
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

export const ADD_GSM = createAsyncThunk<
  GsmsData,
  string,
  { rejectValue: { message: string } }
>("gsm/add", async (gsm, thunkAPI) => {
  try {
    const response = await AdminAPI.post("/gsm/", {
      value: gsm,
    });
    return {
      _id: response.data.data._id,
      value: response.data.data.value,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to add GSM" },
    );
  }
});

export const UPDATE_GSM = createAsyncThunk<
  GsmsData,
  { id: string; value: number },
  { rejectValue: { message: string } }
>("gsm/update", async ({ id, value }, thunkAPI) => {
  try {
    const response = await AdminAPI.put(`/gsm/${id}`, {
      value,
    });
    return {
      _id: response.data.data._id,
      value: response.data.data.value,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to update GSM" },
    );
  }
});

export const DELETE_GSM = createAsyncThunk<
  string,
  string,
  { rejectValue: { message: string } }
>("gsm/delete", async (id, thunkAPI) => {
  try {
    await AdminAPI.delete(`/gsm/${id}`);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to delete GSM" },
    );
  }
});
