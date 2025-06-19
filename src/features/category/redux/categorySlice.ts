import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../service";



export interface CategoryData {
  id?: string;
  name: string;
  image: string | File | null;
}

interface ModelData {
  isUpdate: boolean;
  isAdd: boolean;
  isDelete: boolean;
  id?: string;
  category?: CategoryData;
  categorys: CategoryData[];
  isLoading: boolean;
  message: string;
  isError: boolean;
  success: boolean;
  pagination: {
    totalPages: number;
    currentPage: number;
  };
}

const initialState: ModelData = {
  categorys: [],
  category:undefined,
  isAdd: false,
  isDelete: false,
  isUpdate: false,
  isLoading: false,
  message: "",
  isError: false,
  success:false,
  pagination: {
    totalPages: 1,
    currentPage:1
  }
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
      
      state.category = action.payload??undefined;
     
    },
    resetCategoryState: (state) => {
      state.isError = false
      state.message = ""
      state.success=false
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_CATEGORY.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GET_CATEGORY.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.categorys = action.payload.data;
        state.message = action.payload.message;
        state.pagination = {
          totalPages: action.payload.pagination.totalPages,
          currentPage: action.payload.pagination.currentPage,
        };
      })
      .addCase(GET_CATEGORY.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as any)?.message || "Failed to fetch";
      })

      .addCase(ADD_CATEGORY.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(ADD_CATEGORY.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.isAdd = false;
        state.categorys.push(action.payload.data);
        state.message = action.payload.message;
      })
      .addCase(ADD_CATEGORY.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as any)?.message || "Failed to add";
      })

      .addCase(UPDATE_CATEGORY.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(UPDATE_CATEGORY.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        const index = state.categorys.findIndex(
          (cat) => cat.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.categorys[index] = action.payload.data;
        }
        state.message = "Category updated successfully!";
      })
      .addCase(UPDATE_CATEGORY.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          (action.payload as any)?.message || "Failed to update category";
      })

      .addCase(DELETE_CATEGORY.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(DELETE_CATEGORY.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.categorys = state.categorys.filter(
          (cat) => cat.id !== action.meta.arg,
        );
        state.message = action.payload.message;
      })
      .addCase(DELETE_CATEGORY.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          (action.payload as any)?.message || "Failed to delete category";
      });
  }
});
export const {
  setIsUpdate,
  setIsAdd,
  setIsDelete,
  setCategoryId,
  setCategory,
} = CategorySlice.actions;

export const CategoryReducer = CategorySlice.reducer;
