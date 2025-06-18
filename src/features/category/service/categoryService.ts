import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAPI } from "../../../services";


export const GET_CATEGORY = createAsyncThunk(
  "category/get",
  async (_, thunkAPI) => {
    try {
      const response = await AdminAPI.get("category/get/");
      const rawData = response.data.data || [];

      const formattedData = rawData.map((item: any) => ({
        id: item._id,
        image: item.imageUrl,
        name: item.name,
      }));

      return {
        data: formattedData,
        message: "category fetched successfully",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to fetch category" },
      );
    }
  },
);

export const ADD_CATEGORY = createAsyncThunk(
  "category/add",
  async (CategoryData: { name: string; image: File }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("name", CategoryData.name);
      formData.append("image", CategoryData.image);

      const response = await AdminAPI.post("category/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return {
        data: {
          id: response.data.data._id,
          name: response.data.data.name,
          image: response.data.data.imageUrl,
        },
        message: "category added successfully",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to add category" },
      );
    }
  },
);

export const UPDATE_CATEGORY = createAsyncThunk(
  "category/update",
  async (
    CategoryData: { id: string; name: string; image?: File },
    thunkAPI,
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", CategoryData.name);
      if (CategoryData.image) {
        formData.append("image", CategoryData.image);
      }

      const response = await AdminAPI.put(
        `category/${CategoryData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return {
        data: {
          id: response.data.data._id,
          name: response.data.data.name,
          image: response.data.data.imageUrl,
        },
        message: "category updated successfully",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to update collection" },
      );
    }
  },
);

export const DELETE_CATEGORY = createAsyncThunk(
  "category/delete",
  async (id: string, thunkAPI) => {
    try {
      await AdminAPI.delete(`category/${id}`);
      return { message: "category deleted successfully" };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to delete category" },
      );
    }
  },
);
