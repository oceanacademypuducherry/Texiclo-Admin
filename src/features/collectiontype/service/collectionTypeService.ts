import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAPI } from "../../../services";

// export const GET_COLLECTIONTYPE = createAsyncThunk(
//   "collectionType-get",
//   async (_, thunkAPI) => {
//     try {
//       const response = await AdminAPI.get("collectionType/get/");
//       const rawList = response.data.data ?? []
//       const formattedData = rawList.data.map((item: any) => ({
//         id: item._id,
//         image: item.imageUrl, // match your component prop
//         name: item.name,
//       }));

//       return { data: formattedData, message: "Fetched successfully" };
//     } catch (error: any) {
//       console.error(error);
//       return thunkAPI.rejectWithValue(
//         error.response?.data || { message: "Fetch failed" },
//       );
//     }
//   },
// );

// export const ADD_COLLECTION = createAsyncThunk(
//     "add-collection",
//     async (img: File, thunkAPI) => {
//         const formData = new FormData()
//         formData.append("image", img)

//         try {
//             const response = await AdminAPI.post("collectionType/create/", formData,{
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                   },
//             });
//             return response.data

//         }  catch (error: any) {
//             console.error(error);
//             return thunkAPI.rejectWithValue(error.response?.data || error.message);
//           }
//     }
// )
export const GET_COLLECTIONTYPE = createAsyncThunk(
  "collectionType/get",
  async (_, thunkAPI) => {
    try {
      const response = await AdminAPI.get("collectionType/get/");
      const rawData = response.data.data || [];

      const formattedData = rawData.map((item: any) => ({
        id: item._id,
        image: item.imageUrl,
        name: item.name,
      }));

      return {
        data: formattedData,
        message: "Collections fetched successfully",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to fetch collections" },
      );
    }
  },
);

export const ADD_COLLECTION = createAsyncThunk(
  "collectionType/add",
  async (collectionData: { name: string; image: File }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("name", collectionData.name);
      formData.append("image", collectionData.image);

      const response = await AdminAPI.post("collectionType/create/", formData, {
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
        message: "Collection added successfully",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to add collection" },
      );
    }
  },
);

export const UPDATE_COLLECTION = createAsyncThunk(
  "collectionType/update",
  async (
    collectionData: { id: string; name: string; image?: File },
    thunkAPI,
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", collectionData.name);
      if (collectionData.image) {
        formData.append("image", collectionData.image);
      }

      const response = await AdminAPI.put(
        `collectionType/${collectionData.id}`,
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
        message: "Collection updated successfully",
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to update collection" },
      );
    }
  },
);

export const DELETE_COLLECTION = createAsyncThunk(
  "collectionType/delete",
  async (id: string, thunkAPI) => {
    try {
      await AdminAPI.delete(`collectionType/${id}`);
      return { message: "Collection deleted successfully" };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to delete collection" },
      );
    }
  },
);
