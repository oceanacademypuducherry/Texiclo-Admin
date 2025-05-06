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
  id?: string;
  banner?: BannersData;
  banners: BannersData[];

}

const initialState: BannerState = {
  isAdd: false,
  isDelete: false,
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
    
    // Delete banner by ID
    deleteBanner: (state, action: PayloadAction<BannersData>) => {
      state.banners = state.banners.filter((col) => col.id !== action.payload.id);
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
} = bannerSlice.actions;

export const BannerReducer = bannerSlice.reducer;
