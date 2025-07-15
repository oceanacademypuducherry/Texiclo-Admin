import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GET_ALL_PRODUCTS } from "../service";

interface ProductListItem {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  price: number;
  discountedPrice: number;
  variantImage: string;
  colors: { name: string; code: string }[];
}

interface ProductListState {
  products: ProductListItem[];
  searchQuery: string;
  selectedCategories: string[];
  selectedCollections: string[];
  isFilterApplied: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ProductListState = {
  products: [],
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
  isFilterApplied: false,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    toggleCategoryFilter(state, action: PayloadAction<string>) {
      const cat = action.payload;
      state.selectedCategories = state.selectedCategories.includes(cat)
        ? state.selectedCategories.filter((c) => c !== cat)
        : [...state.selectedCategories, cat];
      state.isFilterApplied = true;
    },
    toggleCollectionFilter(state, action: PayloadAction<string>) {
      const col = action.payload;
      state.selectedCollections = state.selectedCollections.includes(col)
        ? state.selectedCollections.filter((c) => c !== col)
        : [...state.selectedCollections, col];
      state.isFilterApplied = true;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.isFilterApplied = true;
    },
    resetFilters(state) {
      state.searchQuery = "";
      state.selectedCategories = [];
      state.selectedCollections = [];
      state.isFilterApplied = false;
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

        state.products = data.map((p: any) => ({
          id: p._id,
          title: p.name,
          description: p.description,
          discountPercentage: p.discountPercentage,
          price: p.price,
          discountedPrice: p.discountedPrice,
          variantImage: p.variantImage,
          colors: p.colors,
        }));

        state.pagination = pagination;
      })
      .addCase(GET_ALL_PRODUCTS.rejected, (state, action: any) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to fetch products";
      });
  },
});

export const {
  setSearchQuery,
  toggleCategoryFilter,
  toggleCollectionFilter,
  resetFilters,
} = productListSlice.actions;

export const productListReducer = productListSlice.reducer;
