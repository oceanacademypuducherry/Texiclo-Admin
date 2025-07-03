import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductFormData {
  id?: string;
  productName: string;
  collectionType: string;
  category: string;
  description: string;
  prices: { [key: string]: number };
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
    resetForm(state) {
      return { ...initialState };
    },
  },
});

export const { setFormData, resetForm } = productFormSlice.actions;
export const productFormReducer = productFormSlice.reducer;
