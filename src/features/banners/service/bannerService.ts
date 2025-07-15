import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAPI } from "../../../services";
import { BannersData } from "../redux";

interface GetBannersResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    position: number;
    imageUrl: string;
  }[];
}
export const GET_BANNERS = createAsyncThunk<GetBannersResponse[]>(
  "banners/get",
  async (_, thunkAPI) => {
    try {
      const response = await AdminAPI.get("/banner/get");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "something went wrong",
      );
    }
  },
);

export const ADD_BANNER = createAsyncThunk<BannersData, BannersData>(
  "banners/add",
  async (bannerData, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("imageUrl", bannerData.image as File);

      const response = await AdminAPI.post("/banner/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data.data;

      return {
        id: data._id,
        position: data.position,
        image: data.imageUrl,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "something went wrong",
      );
    }
  },
);
