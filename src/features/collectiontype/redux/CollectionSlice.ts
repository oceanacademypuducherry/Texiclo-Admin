import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ADD_COLLECTION,
  DELETE_COLLECTION,
  GET_COLLECTIONTYPE,
  UPDATE_COLLECTION,
} from "../service";
import { act } from "react";

export interface CollectionsData {
  id?: string;
  name: string;
  image: string | File | null;
}

interface CollectionState {
  collections: CollectionsData[];
  collection?: CollectionsData | null;
  id?: string;
  isAdd: boolean;
  isUpdate: boolean;
  isDelete: boolean;
  isLoading: boolean;
  message: string;
  isError: boolean;
  success: boolean;
}

const initialState: CollectionState = {
  collections: [],
  collection: undefined,
  id: undefined,
  isAdd: false,
  isUpdate: false,
  isDelete: false,
  isLoading: false,
  message: "",
  isError: false,
  success: false,
};

const CollectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setCollectionUpdateMode: (state, action: PayloadAction<boolean>) => {
      state.isUpdate = action.payload;
    },
    setCollectionAddMode: (state, action: PayloadAction<boolean>) => {
      state.isAdd = action.payload;
    },
    setCollectionDeleteMode: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },
    setCollectionId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setCollection: (state, action: PayloadAction<CollectionsData | null>) => {
      state.collection = action.payload;
    },
    // addCollection: (state, action: PayloadAction<CollectionsData>) => {
    //   state.collections?.push(action.payload);
    // },
    // updateCollection: (state, action: PayloadAction<CollectionsData>) => {
    //   const index = state.collections.findIndex(
    //     (col) => col.id === action.payload.id,
    //   );
    //   if (index !== -1) {
    //     state.collections[index] = action.payload;
    //   }
    // },

    // deleteCollection: (state, action: PayloadAction<string>) => {
    //   state.collections = state.collections.filter(
    //     (col) => col.id !== action.payload,
    //   );
    // },
    resetCollectionState: (state) => {
      state.isError = false;
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_COLLECTIONTYPE.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GET_COLLECTIONTYPE.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.isError = false;
        state.message = action.payload.message;
        state.collections = action.payload.data;
      })
      .addCase(GET_COLLECTIONTYPE.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          (action.payload as any)?.message ||
          action.error?.message ||
          "Failed to fetch collections";
      })
      // ADD_COLLECTION
      .addCase(ADD_COLLECTION.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(ADD_COLLECTION.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.isAdd = false;
        // Add the new collection to the list
        state.collections.push(action.payload.data);
        state.message = action.payload.message;
      })
      .addCase(ADD_COLLECTION.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          (action.payload as any)?.message || "Failed to add collection";
      })

      // UPDATE_COLLECTION
      .addCase(UPDATE_COLLECTION.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(UPDATE_COLLECTION.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        const index = state.collections.findIndex(
          (col) => col.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.collections[index] = action.payload.data;
        }
        state.message = "Collection updated successfully!";
      })
      .addCase(UPDATE_COLLECTION.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          (action.payload as any)?.message || "Failed to update collection";
      })

      // DELETE_COLLECTION
      .addCase(DELETE_COLLECTION.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(DELETE_COLLECTION.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;

        state.collections = state.collections.filter(
          (col) => col.id !== action.meta.arg,
        );
        state.message = action.payload.message;
      })
      .addCase(DELETE_COLLECTION.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          (action.payload as any)?.message || "Failed to delete collection";
      });
  },
});

export const {
  setCollectionUpdateMode,
  setCollectionAddMode,
  setCollectionDeleteMode,
  setCollectionId,
  setCollection,
  // addCollection,
  // updateCollection,
  // deleteCollection,
  resetCollectionState,
} = CollectionSlice.actions;

export const CollectionReducer = CollectionSlice.reducer;
