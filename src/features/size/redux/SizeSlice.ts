import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ADD_SIZE, DELETE_SIZE, GET_SIZE, UPDATE_SIZE } from "../service";

export interface SizesData {
  _id: string;
  label: string;
}

interface SizeState {
  isAdd: boolean;
  isDelete: boolean;
  isUpdate: boolean;
  _id?: string;
  size?: SizesData;
  sizes: SizesData[];
  loading: boolean;
  error: string | null;
}

const initialState: SizeState = {
  isAdd: false,
  isDelete: false,
  isUpdate: false,
  sizes: [],
  loading: false,
  error: null,
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

  extraReducers: (builder) => {
    // GET
    builder.addCase(GET_SIZE.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(GET_SIZE.fulfilled, (state, action) => {
      state.loading = false;
      state.sizes = action.payload;
    });
    builder.addCase(GET_SIZE.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to fetch Sizes";
    });

    // ADD
    builder.addCase(ADD_SIZE.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ADD_SIZE.fulfilled, (state, action) => {
      state.loading = false;
      const exists = state.sizes.some((s) => s.label === action.payload.label);
      if (!exists) {
        state.sizes.push(action.payload);
      }
    });
    builder.addCase(ADD_SIZE.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to add Size";
    });

    // UPDATE
    builder.addCase(UPDATE_SIZE.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UPDATE_SIZE.fulfilled, (state, action) => {
      state.loading = false;
      state.sizes = state.sizes.map((size) =>
        size._id === action.payload._id ? action.payload : size,
      );
    });
    builder.addCase(UPDATE_SIZE.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to update Size";
    });

    // DELETE
    builder.addCase(DELETE_SIZE.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DELETE_SIZE.fulfilled, (state, action) => {
      state.loading = false;
      state.sizes = state.sizes.filter((size) => size._id !== action.payload);
    });
    builder.addCase(DELETE_SIZE.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to delete Size";
    });
  },
});

export const {
  setSize,
  setSizeAdd,
  setSizeDelete,
  setSizeUpdate,
  setSizeId,
  clearSize,
  resetModalStates,
} = sizeSlice.actions;

export const SizeReducer = sizeSlice.reducer;
