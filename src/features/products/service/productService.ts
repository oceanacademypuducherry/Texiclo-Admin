import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminAPI } from "../../../services";

// export const GET_ALL_PRODUCTS = createAsyncThunk<
//   any,
//   number,
//   { rejectValue: { message: string } }
// >("product/getAll", async (page = 1, thunkAPI) => {
//   try {
//     const response = await AdminAPI.get(`/product/get/${page}`);
//     return response.data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(
//       error.response?.data || { message: "Failed to fetch products" },
//     );
//   }
// });

export const GET_ALL_PRODUCTS = createAsyncThunk<
  any,
  number,
  { rejectValue: { message: string } }
>("product/getAll", async (page = 1, thunkAPI) => {
  try {
    const state: any = thunkAPI.getState();
    const {
      selectedCategories,
      selectedCollections,
      searchQuery,
      isFilterApplied,
    } = state.productList;

    const endpoint = `/product/get/${page}`;

    let response;
    console.log(isFilterApplied);

    if (isFilterApplied) {
      const body = {
        category: selectedCategories,
        collectionTypes: selectedCollections,
        searchText: searchQuery,
      };
      response = await AdminAPI.post(endpoint, body);
    } else {
      // Don't send filters if not applied
      response = await AdminAPI.post(endpoint);
    }

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

export const UPDATE_PRODUCT = createAsyncThunk(
  "product/update",
  async (
    { id, productData }: { id: string; productData: any },
    { rejectWithValue },
  ) => {
    try {
      const formData = new FormData();

      // Core product fields
      formData.append("productName", productData.name);
      formData.append("collectionId", productData.collectionId);
      formData.append("categoryId", productData.categoryId);
      formData.append("description", productData.description);
      formData.append(
        "discountPercentage",
        productData.discountPercentage?.toString() || "0",
      );
      formData.append("sizeIds", JSON.stringify(productData.sizeIds));

      // Prices
      const prices = productData.prices.map((p: any) => ({
        gsmId: p.gsmId,
        amount: parseFloat(p.amount),
      }));
      formData.append("prices", JSON.stringify(prices));

      // Variants
      formData.append("variants", JSON.stringify(productData.variants));

      productData.variants.forEach((variant: any, i: number) => {
        formData.append(`variants[${i}].color`, variant.color);

        if (variant._id) {
          formData.append(`variants[${i}]._id`, variant._id);
        }

        if (variant.variantImage instanceof File)
          formData.append(`variants[${i}].variantImage`, variant.variantImage);
        if (variant.frontImage instanceof File)
          formData.append(`variants[${i}].frontImage`, variant.frontImage);
        if (variant.backImage instanceof File)
          formData.append(`variants[${i}].backImage`, variant.backImage);

        if (variant.otherImages?.length) {
          variant.otherImages.forEach((img: File, j: number) => {
            if (img instanceof File) {
              formData.append(`variants[${i}].otherImage[${j}]`, img);
            }
          });
        }
      });

      const response = await AdminAPI.put(`/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("❌ UPDATE_PRODUCT error:", error);
      return rejectWithValue(
        error.response?.data || "Failed to update product",
      );
    }
  },
);

export const DELETE_PRODUCT = createAsyncThunk<
  any,
  string,
  { rejectValue: { message: string } }
>("product/delete", async (id, thunkAPI) => {
  try {
    const response = await AdminAPI.delete(`/product/${id}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data || { message: "Failed to delete product" },
    );
  }
});
