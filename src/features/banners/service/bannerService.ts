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

export const UPDATE_BANNER = createAsyncThunk(
  "banner/update",
  async (bannerData: BannersData, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("position", String(bannerData.position));
      if (bannerData.image && bannerData.image instanceof File) {
        formData.append("imageUrl", bannerData.image);
      }

      const res = await AdminAPI.put(`/banner/${bannerData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return {
        id: res.data.data._id,
        position: res.data.data.position,
        image: res.data.data.imageUrl,
        message: "Banner updated successfully",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to update banner" },
      );
    }
  },
);

export const DELETE_BANNER = createAsyncThunk(
  "banner/delete",
  async (id: string, thunkAPI) => {
    try {
      await AdminAPI.delete(`/banner/${id}`);
      return { id, message: "Banner deleted successfully" };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to delete banner" },
      );
    }
  },
);
export const UPDATE_ALL_BANNERS = createAsyncThunk(
  "banners/updateAll",
  async (banners: BannersData[], thunkAPI) => {
    try {
      const formData = new FormData();

      // Step 1: Prepare plain JSON (id and position only)
      const bannersPayload = banners.map((banner) => ({
        _id: banner._id,
        position: banner.position,
      }));

      // Step 2: Append JSON string for banners
      formData.append("banners", JSON.stringify(bannersPayload));

      // Step 3: Append images with fieldname as image-<id>
      banners.forEach((banner) => {
        if (banner.image instanceof File) {
          formData.append(`image-${banner._id}`, banner.image); // 👈 must match backend expectation
        }
      });

      // Step 4: Send request
      const response = await AdminAPI.put("/banner/update-all", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || "Banner update failed");
      }
    } catch (error: any) {
      console.error("UPDATE_ALL_BANNERS error:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to update banners" },
      );
    }
  },
);
