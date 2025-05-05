import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModelData {
  isUpdate: boolean;
  isAdd: boolean;
  isDelete: boolean;
  id?: string;
  collection?: CollectionsData;
   collections?: CollectionsData[]; 
}

export interface CollectionsData {
  id?: string;
  name: string;
  image: string | File | null;
}

export interface AddCollectionData {
  name: string;
  image: string | File | null;
}

const initialState: ModelData = {
  isAdd: false,
  isDelete: false,
  isUpdate: false,
  collections: [],
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
      if (action.payload != null) {
        state.collection = action.payload;
      }
    },
    // ✅ New Actions for API integration
    addCollection: (state, action: PayloadAction<CollectionsData>) => {
      state.collections?.push(action.payload);
    },
    updateCollection: (state, action: PayloadAction<CollectionsData>) => {
      if (state.collections) {
        state.collections = state.collections.map((col) =>
          col.id === action.payload.id ? action.payload : col,
        );
      }
    },

    deleteCollection: (state, action: PayloadAction<string>) => {
      state.collections = state.collections?.filter(
        (col) => col.id !== action.payload,
      );
    },
  },
});

export const {
  setCollectionUpdateMode,
  setCollectionAddMode,
  setCollectionDeleteMode,
  setCollectionId,
  setCollection,
  addCollection,
  updateCollection,
  deleteCollection
} = CollectionSlice.actions;

export const CollectionReducer = CollectionSlice.reducer;
