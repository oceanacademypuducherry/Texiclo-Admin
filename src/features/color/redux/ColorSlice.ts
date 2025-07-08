import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ColorsData {
  _id: string;
  colorName: string;
  colorValue: string;
}

interface ColorState {
  isAdd: boolean;
  isDelete: boolean;
  isUpdate: boolean;
  _id?: string;
  colorName: string;
  colorValue: string;
  color?: ColorsData;
  colors: ColorsData[];
}

const initialState: ColorState = {
  isAdd: false,
  isDelete: false,
  isUpdate: false,
  colorName: "",
  colorValue: "",
  colors: [
    { _id: "ds5f45sad4f654dsa", colorName: "red", colorValue: "#646545" },
    { _id: "dafsad453f5dsaasdf", colorName: "blue", colorValue: "#465sdf" },
    { _id: "456d4fsa56dsfasd6", colorName: "green", colorValue: "#dadsf654ds" },
  ],
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColorAdd: (state, action: PayloadAction<boolean>) => {
      state.isAdd = action.payload;
    },
    setColorDelete: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },
    setColorUpdate: (state, action: PayloadAction<boolean>) => {
      state.isUpdate = action.payload;
    },
    setColorId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
    setColor: (state, action: PayloadAction<ColorsData>) => {
      state.color = action.payload;
    },
    addColor: (state, action: PayloadAction<ColorsData>) => {
      const exists = state.colors.some((col) => col._id === action.payload._id);
      if (!exists) {
        state.colors.push(action.payload);
      }
    },
    updateColor: (state, action: PayloadAction<ColorsData>) => {
      state.colors = state.colors.map((col) =>
        col._id === action.payload._id ? action.payload : col,
      );
    },
    deleteColor: (state, action: PayloadAction<ColorsData>) => {
      state.colors = state.colors.filter(
        (col) => col._id !== action.payload._id,
      );
    },
    setColorData: (state, action: PayloadAction<ColorsData[]>) => {
      state.colors = action.payload;
    },
    clearColor: (state) => {
      state.color = undefined;
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
  setColor,
  setColorAdd,
  setColorDelete,
  setColorUpdate,
  setColorId,
  setColorData,
  clearColor,
  resetModalStates,
  addColor,
  deleteColor,
  updateColor,
} = colorSlice.actions;

export const ColorReducer = colorSlice.reducer;
