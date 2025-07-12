import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from "../service";

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
  allProducts: Product[];
  productDetail: Product | null;
  searchQuery: string;
  selectedCategories: string[];
  selectedCollections: string[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  allProducts: [],
  productDetail: null,
  searchQuery: "",
  selectedCategories: [],
  selectedCollections: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
  },
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.allProducts = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.allProducts.push(action.payload);
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.allProducts = state.allProducts.filter(
        (p) => p.id !== action.payload,
      );
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    toggleCategoryFilter(state, action: PayloadAction<string>) {
      const cat = action.payload;
      state.selectedCategories = state.selectedCategories.includes(cat)
        ? state.selectedCategories.filter((c) => c !== cat)
        : [...state.selectedCategories, cat];
    },
    toggleCollectionFilter(state, action: PayloadAction<string>) {
      const col = action.payload;
      state.selectedCollections = state.selectedCollections.includes(col)
        ? state.selectedCollections.filter((c) => c !== col)
        : [...state.selectedCollections, col];
    },
    resetFilters(state) {
      state.selectedCategories = [];
      state.selectedCollections = [];
      state.searchQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_ALL_PRODUCTS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GET_ALL_PRODUCTS.fulfilled, (state, action) => {
        state.loading = false;
        const { data, pagination } = action.payload;

        state.allProducts = data.map((p: any) => ({
          id: p._id,
          title: p.description,
          collectionType: "",
          category: "",
          description: p.description,
          prices: Object.fromEntries(
            p.prices.map((price: any) => [price.gsmId, price.amount]),
          ),
          sizes: [],
          discountPercentage: p.discountPercentage,
          variants: [
            {
              color: {
                name: p.variant.colors.colorName,
                code: p.variant.colors.colorValue,
              },
              previewImage: p.variant.varientImageLink,
              frontImage: "",
              backImage: "",
              otherImages: [],
            },
          ],
        }));

        state.pagination = pagination;
      })
      .addCase(GET_ALL_PRODUCTS.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch products";
      })
    .addCase(GET_PRODUCT_BY_ID.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.productDetail = null;
    })
    .addCase(GET_PRODUCT_BY_ID.fulfilled, (state, action) => {
      const p = action.payload.data;
      state.loading = false;
      state.productDetail = {
        id: p._id,
        title: p.productName,
        collectionType: p.collectionId,
        category: p.categoryId,
        description: p.description,
        prices: Object.fromEntries(
          p.prices.map((price: any) => [price.gsmName, price.amount])
        ),
        sizes: p.sizes||[], 
        discountPercentage: p.discountPercentage,
        variants: p.variantData.map((variant: any) => ({
          color: {
            name: variant.colors.colorName,
            code: variant.colors.colorValue,
          },
          previewImage: variant.varientImage,
          frontImage: variant.frontImage,
          backImage: variant.backImage,
          otherImages: variant.otherImage,
        })),
      };
    })
    .addCase(GET_PRODUCT_BY_ID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to fetch product";
    });
  },
});

export const {
  setProducts,
  deleteProduct,
  setSearchQuery,
  toggleCategoryFilter,
  toggleCollectionFilter,
  resetFilters,
  addProduct,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
