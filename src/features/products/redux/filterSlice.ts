import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface FilterState{
    selectedCategories: string[]
    selectedCollections:string[]
}
const initialState: FilterState = {
  selectedCategories: [],
  selectedCollections: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilterCategory(state, action: PayloadAction<string>) {
            const category = action.payload;
            if (state.selectedCategories.includes(category)) {
              state.selectedCategories = state.selectedCategories.filter((c) => c !== category);
            } else {
              state.selectedCategories.push(category);
            }
          },
          setFilterCollection(state, action: PayloadAction<string>) {
            const collection = action.payload;
            if (state.selectedCollections.includes(collection)) {
              state.selectedCollections = state.selectedCollections.filter((c) => c !== collection);
            } else {
              state.selectedCollections.push(collection);
            }
          },
          resetFilters(state) {
            state.selectedCategories = [];
            state.selectedCollections = [];
          }
        },
    }
)

export const { setFilterCategory, setFilterCollection, resetFilters } = filterSlice.actions

export const FilterReducer=filterSlice.reducer