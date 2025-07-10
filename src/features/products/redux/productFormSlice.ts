import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Color {
  name: string;
  code: string;
}
export interface Base64Image {
  name: string;
  type: string;
  base64: string;
}
export type ImageSource = File | Base64Image | string; // URL string

interface Variant {
  color: Color;
  previewImage: ImageSource | null;
  frontImage: ImageSource | null;
  backImage: ImageSource | null;
  otherImages?: ImageSource[];
}

export interface ProductForm {
  productName: string;
  collectionType: string;
  category: string;
  description: string;
  discount: number;
  prices: Record<string, number | string>;
  sizes: string[];
  variants: Variant[];
}



const initialState: { formData: ProductForm } = {
  formData: {
    productName: "",
    collectionType: "",
    category: "",
    description: "",
    discount: 0,
    prices: {},
    sizes: [],
    variants: [
      {
        color: { name: "", code: "" },
        previewImage: null,
        frontImage: null,
        backImage: null,
        otherImages: [],
      },
    ],
  },
};

const productFormSlice = createSlice({
  name: "productForm",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<ProductForm>>) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    addLocalVariant: (state) => {
      state.formData.variants.push({
        color: { name: "", code: "" },
        previewImage: null,
        frontImage: null,
        backImage: null,
        otherImages: [],
      });
    },

    updateVariantImage: (
      state,
      action: PayloadAction<{
        index: number;
        field: keyof Variant;
        value: ImageSource | ImageSource[]; // ✅ Updated type
      }>,
    ) => {
      const { index, field, value } = action.payload;
      if (state.formData.variants[index]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state.formData.variants[index] as any)[field] = value;
      }
    },
    addNewProduct: (_, action: PayloadAction<ProductForm>) => {
      console.log("Submitting product:", action.payload);
      // Here, you might dispatch an async thunk to post to backend
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const {
  setFormData,
  addLocalVariant,
  updateVariantImage,
  addNewProduct,
  resetForm,
} = productFormSlice.actions;

export const productFormReducer = productFormSlice.reducer;
