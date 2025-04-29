import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModelData {
  isUpdate: boolean;
  isAdd: boolean;
  isDelete: boolean;
  _id?: string;
  collection?: CollectionsData;
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
      state._id = action.payload;
    },
    setCollection: (state, action: PayloadAction<CollectionsData | null>) => {
      if (action.payload != null) {
        state.collection = action.payload;
      }
    },
  },
});

export const {
  setCollectionUpdateMode,
  setCollectionAddMode,
  setCollectionDeleteMode,
  setCollectionId,
  setCollection,
} = CollectionSlice.actions;

export const CollectionReducer = CollectionSlice.reducer;
