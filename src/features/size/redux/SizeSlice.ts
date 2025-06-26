import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SizesData {
  id: string;
  size:string
}

interface SizeState {
  isAdd: boolean;
  isDelete: boolean;
  isUpdate: boolean;
  id?: string;
  size?: SizesData;
  sizes: SizesData[];
}

const initialState: SizeState = {
  isAdd: false,
  isDelete: false,
  isUpdate: false,
  sizes: [],
};

const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    setSizeAdd: (state, action: PayloadAction<boolean>) => {
      state.isAdd = action.payload;
    },
    setSizeDelete: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },
    setSizeUpdate: (state, action: PayloadAction<boolean>) => {
      state.isUpdate = action.payload;
    },

    setSizeId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setSize: (state, action: PayloadAction<SizesData>) => {
      state.size = action.payload;
    },

    addSize: (state, action: PayloadAction<SizesData>) => {
      const exists = state.sizes.some((col) => col.id === action.payload.id);
      if (!exists) {
        state.sizes.push(action.payload);
      }
    },

    updateSize: (state, action: PayloadAction<SizesData>) => {
      state.sizes = state.sizes.map((Size) =>
        Size.id === action.payload.id ? action.payload : Size,
      );
    },

    deleteSize: (state, action: PayloadAction<SizesData>) => {
      state.sizes = state.sizes.filter((col) => col.id !== action.payload.id);
    },

    setSizeData: (state, action: PayloadAction<SizesData[]>) => {
      state.sizes = action.payload;
    },
    clearSize: (state) => {
      state.size = undefined;
      state.id = undefined;
    },

    resetModalStates: (state) => {
      state.isAdd = false;
      state.isDelete = false;
      state.isUpdate = false;
    },
  },
});

export const {
  setSize,
  setSizeAdd,
  setSizeDelete,
  setSizeUpdate,
  setSizeId,
  setSizeData,
  clearSize,
  resetModalStates,
  addSize,
  deleteSize,
  updateSize,
} = sizeSlice.actions;

export const SizeReducer = sizeSlice.reducer;
