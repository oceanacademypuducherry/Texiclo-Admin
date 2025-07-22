import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ADD_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  UPDATE_PRODUCT,
} from "../service";

interface Variant {
  color: { name: string; code: string };
  variantImage: string;
  frontImage: string;
  backImage: string;
  otherImages: string[];
}

interface Product {
  id: string;
  title: string;
  collectionType: string;
  category: string;
  description: string;
  prices: { [key: string]: number };
  sizes: string[];
  discountPercentage: number;
  variants: Variant[];
}

interface ProductState {
  loading: boolean;
  error: string | null;
  updateSuccess: boolean;
}

const initialState: ProductState = {
  loading: false,
  error: null,
  updateSuccess: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(ADD_PRODUCT.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ADD_PRODUCT.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(ADD_PRODUCT.rejected, (state, action: any) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to add product";
      })
      .addCase(UPDATE_PRODUCT.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(UPDATE_PRODUCT.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updateSuccess = true;
      })
      .addCase(UPDATE_PRODUCT.rejected, (state, action: any) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to update product";
      });
  },
});

export const {
  resetUpdateStatus,
  // setProducts,
  // deleteProduct,
  // setSearchQuery,
  // toggleCategoryFilter,
  // toggleCollectionFilter,
  // resetFilters,
  // addProduct,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
