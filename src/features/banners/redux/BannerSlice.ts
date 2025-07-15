import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ADD_BANNER, GET_BANNERS } from "../service";

export interface BannersData {
  id?: string;
  position: number;
  image: string | File | null;
}

interface BannerState {
  data: BannersData[];
  loading: boolean;
  error: string | null;
  selectedBanner?: BannersData;
  selectedId?: string;
  modals: {
    isAddOpen: boolean;
    isUpdateOpen: boolean;
    isDeleteOpen: boolean;
    isBulkEditOpen: boolean;
  };
}

const initialState: BannerState = {
  data: [],
  loading: false,
  error: null,
  selectedBanner: undefined,
  selectedId: undefined,
  modals: {
    isAddOpen: false,
    isUpdateOpen: false,
    isDeleteOpen: false,
    isBulkEditOpen: false,
  },
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.modals.isAddOpen = true;
    },
    closeAddModal: (state) => {
      state.modals.isAddOpen = false;
      state.selectedBanner = undefined;
    },
    openUpdateModal: (state, action: PayloadAction<BannersData>) => {
      state.modals.isUpdateOpen = true;
      state.selectedBanner = action.payload;
    },
    closeUpdateModal: (state) => {
      state.modals.isUpdateOpen = false;
      state.selectedBanner = undefined;
    },
    openDeleteModal: (state, action: PayloadAction<string>) => {
      state.modals.isDeleteOpen = true;
      state.selectedId = action.payload;
    },
    closeDeleteModal: (state) => {
      state.modals.isDeleteOpen = false;
      state.selectedId = undefined;
    },
    openBulkEditModal: (state) => {
      state.modals.isBulkEditOpen = true;
    },
    closeBulkEditModal: (state) => {
      state.modals.isBulkEditOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_BANNERS.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GET_BANNERS.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.map((item: any) => ({
          id: item._id,
          position: item.position,
          image: item.imageUrl,
        }));
      })
      .addCase(GET_BANNERS.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.payload as any)?.message || "Something went wrong";
      })
      .addCase(ADD_BANNER.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ADD_BANNER.fulfilled, (state, action) => {
        state.loading = false;
        const exists = state.data.some((b) => b.id === action.payload.id);
        if (!exists) {
          state.data.push(action.payload);
        }
      })
      .addCase(ADD_BANNER.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : (action.payload as any)?.message || "Something went wrong";
      });
  },
});

export const {
  openAddModal,
  closeAddModal,
  openUpdateModal,
  closeUpdateModal,
  openDeleteModal,
  closeDeleteModal,
  openBulkEditModal,
  closeBulkEditModal,
} = bannerSlice.actions;

export const BannerReducer = bannerSlice.reducer;
