import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GsmsData {
  id: string;
  gsm: number;
}

interface GsmState {
  isAdd: boolean;
  isDelete: boolean;
  isUpdate: boolean;
  id?: string;
  gsm?: GsmsData;
  gsms: GsmsData[];
}

const initialState: GsmState = {
  isAdd: false,
  isDelete: false,
  isUpdate: false,
  gsms: [],
};

const gsmSlice = createSlice({
  name: "gsm",
  initialState,
  reducers: {
    setGsmAdd: (state, action: PayloadAction<boolean>) => {
      state.isAdd = action.payload;
    },
    setGsmDelete: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },
    setGsmUpdate: (state, action: PayloadAction<boolean>) => {
      state.isUpdate = action.payload;
    },

    setGsmId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setGsm: (state, action: PayloadAction<GsmsData>) => {
      state.gsm = action.payload;
    },

    addGsm: (state, action: PayloadAction<GsmsData>) => {
      const exists = state.gsms.some((col) => col.id === action.payload.id);
      if (!exists) {
        state.gsms.push(action.payload);
      }
    },

    updateGsm: (state, action: PayloadAction<GsmsData>) => {
      state.gsms = state.gsms.map((gsm) =>
        gsm.id === action.payload.id ? action.payload : gsm,
      );
    },

    deleteGsm: (state, action: PayloadAction<GsmsData>) => {
      state.gsms = state.gsms.filter((col) => col.id !== action.payload.id);
    },

    setGsmData: (state, action: PayloadAction<GsmsData[]>) => {
      state.gsms = action.payload;
    },
    clearGsm: (state) => {
      state.gsm = undefined;
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
  setGsm,
  setGsmAdd,
  setGsmDelete,
  setGsmUpdate,
  setGsmId,
  setGsmData,
  clearGsm,
  resetModalStates,
  addGsm,
  deleteGsm,
  updateGsm,
} = gsmSlice.actions;

export const GsmReducer = gsmSlice.reducer;
