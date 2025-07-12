import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAPI } from "../../../services";

export const GET_ALL_PRODUCTS = createAsyncThunk<
  any,
  number,
  { rejectValue: { message: string } }
>("product/getAll", async (page = 1, thunkAPI) => {
  try {
    const response = await AdminAPI.get(`/product/get/${page}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to fetch products" },
    );
  }
});

export const GET_PRODUCT_BY_ID = createAsyncThunk<
  any,
  string,
  { rejectValue: { message: string } }
>("product/getOne", async (id, thunkAPI) => {
  try {
    const response = await AdminAPI.get(`/product/${id}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to fetch product" },
    );
  }
});

//  for add
const base64ToFile = (
  base64: string,
  filename: string,
  mime = "image/jpeg",
) => {
  const arr = base64.split(",");
  const mimeType = arr[0].match(/:(.*?);/)?.[1] || mime;
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mimeType });
};

export const ADD_PRODUCT = createAsyncThunk(
  "product/add",
  async (productData: any, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      console.log(productData.variants, "Formdata");
      formData.append("productName", productData.name);
      formData.append("collectionId", productData.collectionId);
      formData.append("categoryId", productData.categoryId);
      formData.append("description", productData.description);
      formData.append("discountPercentage", productData.discountPercentage);

      formData.append("sizeIds", JSON.stringify(productData.sizeIds));
      const validPrices = productData.prices.filter(
        (p: any) => p.gsmId && p.amount !== "",
      );

      formData.append("prices", JSON.stringify(validPrices));
      formData.append("variants", JSON.stringify(productData.variants));

      for (let i = 0; i < productData.variants.length; i++) {
        const variant = productData.variants[i];
        formData.append(`variants[${i}].color`, variant.color);
        console.log(variant.color);
        formData.append(`variants[${i}].variantImage`, variant.variantImage);
        formData.append(`variants[${i}].frontImage`, variant.frontImage);
        formData.append(`variants[${i}].backImage`, variant.backImage);

        if (variant.otherImages?.length) {
          for (let j = 0; j < variant.otherImages.length; j++) {
            formData.append(
              `variants[${i}].otherImage[${j}]`,
              variant.otherImages[j],
            );
          }
        }
      }

      const response = await AdminAPI.post(`/product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to add product");
    }
  },
);
