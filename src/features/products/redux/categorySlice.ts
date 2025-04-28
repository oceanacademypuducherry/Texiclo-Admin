import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModelData {
  isUpdate: boolean;
  isAdd: boolean;
  isDelete: boolean;
  _id?: string;
  category?: CategoryData;
}
export interface CategoryData {
  id: string;
  name: string;
  image: string | File | null;
}

const initialState: ModelData = {
  isAdd: false,
  isDelete: false,
  isUpdate: false,
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
      state._id = action.payload;
    },
    setCategory: (state, action: PayloadAction<CategoryData | null >) => {
      if(action.payload!=null){
        state.category = action.payload;
      }
    },
  },
});
export const { setIsUpdate, setIsAdd, setIsDelete, setCategoryId,setCategory} =
  CategorySlice.actions;

export const CategoryReducer = CategorySlice.reducer;
