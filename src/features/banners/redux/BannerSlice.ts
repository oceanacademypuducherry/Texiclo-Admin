import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Single banner interface
export interface BannersData {
  id?: string;
  position: number;
  image: string | File | null;
}

// Redux state interface
interface BannerState {
  isAdd: boolean;
  isDelete: boolean;
  isUpdate: boolean;
  isBulkEdit: boolean;
  id?: string;
  banner?: BannersData;
  banners: BannersData[];
}

const initialState: BannerState = {
  isAdd: false,
  isDelete: false,
  isUpdate: false,
  isBulkEdit: false,
  banners: [],
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    // Control Add Modal visibility
    setBannerAdd: (state, action: PayloadAction<boolean>) => {
      state.isAdd = action.payload;
    },
    // Control Delete Modal visibility
    setBannerDelete: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },
    setBannerUpdate: (state, action: PayloadAction<boolean>) => {
      state.isUpdate = action.payload;
    },
    setBulkEdit: (state, action: PayloadAction<boolean>) => {
      state.isBulkEdit = action.payload;
    },
    // Set the ID for deletion
    setBannerId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setBanner: (state, action: PayloadAction<BannersData>) => {
      state.banner = action.payload;
    },
    // Add new banner
    addBanner: (state, action: PayloadAction<BannersData>) => {
      const exists = state.banners.some((col) => col.id === action.payload.id);
      if (!exists) {
        state.banners.push(action.payload);
      }
    },

    updateBanner: (state, action: PayloadAction<BannersData>) => {
      state.banners = state.banners.map((b) =>
        b.id === action.payload.id ? action.payload : b,
      );
    },

    // Delete banner by ID
    deleteBanner: (state, action: PayloadAction<BannersData>) => {
      state.banners = state.banners.filter(
        (col) => col.id !== action.payload.id,
      );
    },
    updateMany: (state, action: PayloadAction<BannersData[]>) => {
      state.banners = action.payload
        .slice()
        .sort((x, y) => x.position - y.position);
    },
    setBannerData: (state, action: PayloadAction<BannersData[]>) => {
      state.banners = action.payload;
    },
  },
});

export const {
  setBannerAdd,
  setBannerDelete,
  setBannerId,
  setBanner,
  addBanner,
  deleteBanner,
  setBannerUpdate,
  setBulkEdit,
  updateBanner,
  updateMany,
  setBannerData,
} = bannerSlice.actions;

export const BannerReducer = bannerSlice.reducer;
