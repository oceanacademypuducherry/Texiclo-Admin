// productFormSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductFormData {
  id?: string;
  productName: string;
  collectionType: string;
  category: string;
  description: string;
  prices: { [gsm: string]: number };
  sizes: string[];
  discount: number;
  variants: {
    color: { name: string; code: string };
    previewImage: string;
    frontImage: string;
    backImage: string;
    otherImages: string[];
  }[];
}

const initialState: ProductFormData = {
  productName: "",
  collectionType: "",
  category: "",
  description: "",
  prices: {},
  sizes: [],
  discount: 0,
  variants: [
    {
      color: { name: "", code: "" },
      previewImage: "",
      frontImage: "",
      backImage: "",
      otherImages: [],
    },
  ],
};

const productFormSlice = createSlice({
  name: "productForm",
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<ProductFormData>) {
      return { ...state, ...action.payload };
    },
    updateField<K extends keyof ProductFormData>(
      state,
      action: PayloadAction<{ key: K; value: ProductFormData[K] }>,
    ) {
      state[action.payload.key] = action.payload.value;
    },
    resetForm() {
      return initialState;
    },
  },
});

export const { setFormData, resetForm, updateField } = productFormSlice.actions;
export const productFormReducer = productFormSlice.reducer;
