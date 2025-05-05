import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CollectionsData } from "../../collectiontype";

interface ModelData {
  isUpdate: boolean;
  isAdd: boolean;
  isDelete: boolean;
  id?: string;
  category?: CategoryData;
  categorys?:CollectionsData[]
}
export interface CategoryData {
  id?: string;
  name: string;
  image: string | File | null;
}

export interface AddCategoryData {
  name: string;
  image: string | File | null;
}


const initialState: ModelData = {
  isAdd: false,
  isDelete: false,
  isUpdate: false,
  categorys:[]
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setIsUpdate: (state, action: PayloadAction<boolean>) => {
      state.isUpdate = action.payload;
    },
    setIsAdd: (state, action: PayloadAction<boolean>) => {
      state.isAdd = action.payload;
    },
    setIsDelete: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setCategory: (state, action: PayloadAction<CategoryData | null>) => {
      if (action.payload != null) {
        state.category = action.payload;
      }
    },
    addCategory: (state, action: PayloadAction<CategoryData>) => {
      if (state.categorys) {
        state.categorys ==
          state.categorys.map((col) =>
            col.id === action.payload.id ? action.payload : col,
          );
      }
    },
    updateCategory: (state, action: PayloadAction<CategoryData>) => {
      if (state.categorys) {
        state.categorys = state.categorys.map((col) =>
          col.id === action.payload.id ? action.payload : col,
        );
      }
    },

    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categorys = state.categorys?.filter(
        (col) => col.id !== action.payload,
      );
    },
  },
});
export const {
  setIsUpdate,
  setIsAdd,
  setIsDelete,
  setCategoryId,
  setCategory,
  addCategory,
  updateCategory,
  deleteCategory
} = CategorySlice.actions;

export const CategoryReducer = CategorySlice.reducer;
