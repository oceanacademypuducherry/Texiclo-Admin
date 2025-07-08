import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GsmsData {
  _id: string;
  gsm: number;
}

interface GsmState {
  isAdd: boolean;
  isDelete: boolean;
  isUpdate: boolean;
  _id?: string;
  gsm?: GsmsData;
  gsms: GsmsData[];
}

const initialState: GsmState = {
  isAdd: false,
  isDelete: false,
  isUpdate: false,
  gsms: [
    { _id: "65dsfsad65465f6sa5dd", gsm: 120 },
    { _id: "adfassdasfsadf36dsafas", gsm: 150 },
    { _id: "da65f4sad6f65dwsafdsa", gsm: 170 },
    { _id: "sdf654dsa65f465ds4f6dsa", gsm: 180 },
    { _id: "fsda65f4sda654fdsa", gsm: 110 },
  ],
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

    setGsm_id: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
    setGsm: (state, action: PayloadAction<GsmsData>) => {
      state.gsm = action.payload;
    },

    addGsm: (state, action: PayloadAction<GsmsData>) => {
      const exists = state.gsms.some((col) => col._id === action.payload._id);
      if (!exists) {
        state.gsms.push(action.payload);
      }
    },

    updateGsm: (state, action: PayloadAction<GsmsData>) => {
      state.gsms = state.gsms.map((gsm) =>
        gsm._id === action.payload._id ? action.payload : gsm,
      );
    },

    deleteGsm: (state, action: PayloadAction<GsmsData>) => {
      state.gsms = state.gsms.filter((col) => col._id !== action.payload._id);
    },

    setGsmData: (state, action: PayloadAction<GsmsData[]>) => {
      state.gsms = action.payload;
    },
    clearGsm: (state) => {
      state.gsm = undefined;
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
  setGsm,
  setGsmAdd,
  setGsmDelete,
  setGsmUpdate,
  setGsm_id,
  setGsmData,
  clearGsm,
  resetModalStates,
  addGsm,
  deleteGsm,
  updateGsm,
} = gsmSlice.actions;

export const GsmReducer = gsmSlice.reducer;
