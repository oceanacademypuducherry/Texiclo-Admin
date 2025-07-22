import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GET_UPDATE_PRODUCT_BY_ID } from "../service";

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
  variantImage: ImageSource | null;
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
  prices: [];
  sizes: string[];
  variants: Variant[];
}

interface ProductFormData {
  formData: ProductForm;
  isLoading: boolean;
  success: boolean;
}

const initialState: ProductFormData = {
  formData: {
    productName: "",
    collectionType: "",
    category: "",
    description: "",
    discount: 0,
    prices: [],
    sizes: [],
    variants: [
      {
        color: { name: "", code: "" },
        variantImage: null,
        frontImage: null,
        backImage: null,
        otherImages: [],
      },
    ],
  },
  isLoading: false,
  success: false,
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
        variantImage: null,
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
  extraReducers(builder) {
    builder
      .addCase(GET_UPDATE_PRODUCT_BY_ID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GET_UPDATE_PRODUCT_BY_ID.fulfilled, (state, action) => {
        const { data, success } = action.payload;
        state.formData = data;
        state.success = success || true;
        state.isLoading = false;
      })
      .addCase(GET_UPDATE_PRODUCT_BY_ID.rejected, (state) => {
        state.formData = initialState.formData;
        state.isLoading = false;
        state.success = false;
      });
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
