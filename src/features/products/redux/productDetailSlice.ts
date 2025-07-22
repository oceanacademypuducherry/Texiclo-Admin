import { createSlice } from "@reduxjs/toolkit";
import { DELETE_PRODUCT, GET_PRODUCT_BY_ID } from "../service";

interface Variant {
  _id:string
  color: { name: string; code: string };
  variantImage: string;
  frontImage: string;
  backImage: string;
  otherImages: string[];
}

interface ProductDetail {
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

interface ProductDetailState {
  product: ProductDetail | null;
  loading: boolean;
  error: string | null;
  deleteSuccess: boolean;
}

const initialState: ProductDetailState = {
  product: null,
  loading: false,
  error: null,
  deleteSuccess: false,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    resetDeleteStatus: (state) => {
      state.deleteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_PRODUCT_BY_ID.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(GET_PRODUCT_BY_ID.fulfilled, (state, action) => {
        const p = action.payload.data;
        state.loading = false;
        state.product = {
          id: p._id,
          title: p.name,
          collectionType: p.collectionId,
          category: p.categoryId,
          description: p.description,
          prices: Object.fromEntries(
            p.prices.map((price: any) => [price.gsmName, price.amount]),
          ),
          sizes: p.sizesData?.map((s: any) => s.label) || [],
          discountPercentage: p.discountPercentage || 0,
          variants: p.variantData.map((variant: any) => ({
            _id: variant._id,
            color: {
              name: variant.color?.name,
              code: variant.color?.code,
            },
            variantImage: variant.variantImage,
            frontImage: variant.frontImage,
            backImage: variant.backImage,
            otherImages: variant.otherImages || [],
          })),
        };
      })
      .addCase(GET_PRODUCT_BY_ID.rejected, (state, action: any) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to fetch product";
      })
      .addCase(DELETE_PRODUCT.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DELETE_PRODUCT.fulfilled, (state) => {
        state.loading = false;
        state.deleteSuccess = true;
        state.product = null;
      })
      .addCase(DELETE_PRODUCT.rejected, (state, action: any) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to delete product";
      });
  },
});
export const { resetDeleteStatus } = productDetailSlice.actions;
export const productDetailReducer = productDetailSlice.reducer;
