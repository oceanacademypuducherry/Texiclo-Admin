import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ADD_GSM, DELETE_GSM, GET_GSM, UPDATE_GSM } from "../service";

export interface GsmsData {
  _id: string;
  value: number;
}

interface GsmState {
  isAdd: boolean;
  isDelete: boolean;
  isUpdate: boolean;
  _id?: string;
  gsm?: GsmsData;
  gsms: GsmsData[];
  loading: boolean;
  error: string | null;
}

const initialState: GsmState = {
  isAdd: false,
  isDelete: false,
  isUpdate: false,
  gsms: [],
  loading: false,
  error: null,
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

  extraReducers: (builder) => {
    // GET
    builder.addCase(GET_GSM.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(GET_GSM.fulfilled, (state, action) => {
      state.loading = false;
      state.gsms = action.payload;
    });
    builder.addCase(GET_GSM.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to fetch GSMs";
    });

    // ADD
    builder.addCase(ADD_GSM.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ADD_GSM.fulfilled, (state, action) => {
      state.loading = false;
      const exists = state.gsms.some((g) => g.value === action.payload.value);
      if (!exists) {
        state.gsms.push(action.payload);
      }
    });

    builder.addCase(ADD_GSM.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to add GSM";
    });

    // UPDATE
    builder.addCase(UPDATE_GSM.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UPDATE_GSM.fulfilled, (state, action) => {
      state.loading = false;
      state.gsms = state.gsms.map((gsm) =>
        gsm._id === action.payload._id ? action.payload : gsm,
      );
    });
    builder.addCase(UPDATE_GSM.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to update GSM";
    });

    // DELETE
    builder.addCase(DELETE_GSM.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DELETE_GSM.fulfilled, (state, action) => {
      state.loading = false;
      state.gsms = state.gsms.filter((gsm) => gsm._id !== action.payload);
    });
    builder.addCase(DELETE_GSM.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to delete GSM";
    });
  },
});

export const {
  setGsm,
  setGsmAdd,
  setGsmDelete,
  setGsmUpdate,
  setGsm_id,
  clearGsm,
  resetModalStates,
} = gsmSlice.actions;

export const GsmReducer = gsmSlice.reducer;
