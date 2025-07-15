import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ADD_PRODUCT, GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from "../service";

interface Variant {
  color: { name: string; code: string };
  previewImage: string;
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
}

const initialState: ProductState = {
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  
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
      });
  },
});

export const {
  // setProducts,
  // deleteProduct,
  // setSearchQuery,
  // toggleCategoryFilter,
  // toggleCollectionFilter,
  // resetFilters,
  // addProduct,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
