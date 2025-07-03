
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  discount: number;
  variants: Variant[];
}

interface ProductState {
  allProducts: Product[];
  searchQuery: string;
  selectedCategories: string[];
  selectedCollections: string[];
}

const initialState: ProductState = {
  allProducts: [],
  searchQuery: "",
  selectedCategories: [],
  selectedCollections: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.allProducts = action.payload;
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.allProducts = state.allProducts.filter(p => p.id !== action.payload);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    toggleCategoryFilter(state, action: PayloadAction<string>) {
      const cat = action.payload;
      state.selectedCategories = state.selectedCategories.includes(cat)
        ? state.selectedCategories.filter(c => c !== cat)
        : [...state.selectedCategories, cat];
    },
    toggleCollectionFilter(state, action: PayloadAction<string>) {
      const col = action.payload;
      state.selectedCollections = state.selectedCollections.includes(col)
        ? state.selectedCollections.filter(c => c !== col)
        : [...state.selectedCollections, col];
    },
    resetFilters(state) {
      state.selectedCategories = [];
      state.selectedCollections = [];
      state.searchQuery = "";
    },
  },
});

export const {
  setProducts,
  deleteProduct,
  setSearchQuery,
  toggleCategoryFilter,
  toggleCollectionFilter,
  resetFilters,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
