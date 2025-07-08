import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SizesData {
  _id: string;
  size: string;
}

interface SizeState {
  isAdd: boolean;
  isDelete: boolean;
  isUpdate: boolean;
  _id?: string;
  size?: SizesData;
  sizes: SizesData[];
}

const initialState: SizeState = {
  isAdd: false,
  isDelete: false,
  isUpdate: false,
  sizes: [
    { _id: "46546ffdsfgfdsf654", size: "s" },
    { _id: "ljsdfsad54f5s4daf65a", size: "lg" },
    { _id: "46546ffdsfgfdsfsafd654", size: "Xs" },
    { _id: "654sad65f46sadsf", size: "xl" },
    { _id: "sjflsaddff5sadf54ssa", size: "xxl" },
  ],
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
      state._id = action.payload;
    },
    setSize: (state, action: PayloadAction<SizesData>) => {
      state.size = action.payload;
    },

    addSize: (state, action: PayloadAction<SizesData>) => {
      const exists = state.sizes.some((col) => col._id === action.payload._id);
      if (!exists) {
        state.sizes.push(action.payload);
      }
    },

    updateSize: (state, action: PayloadAction<SizesData>) => {
      state.sizes = state.sizes.map((Size) =>
        Size._id === action.payload._id ? action.payload : Size,
      );
    },

    deleteSize: (state, action: PayloadAction<SizesData>) => {
      state.sizes = state.sizes.filter((col) => col._id !== action.payload._id);
    },

    setSizeData: (state, action: PayloadAction<SizesData[]>) => {
      state.sizes = action.payload;
    },
    clearSize: (state) => {
      state.size = undefined;
      state._id = undefined;
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
