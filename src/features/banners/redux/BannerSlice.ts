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
  _id?: string;
  banners: BannersData[];
  currentBanner?: BannersData;
}

const initialState: BannerState = {
  isAdd: false,
  isDelete: false,
  banners: [],
  currentBanner: undefined,
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
      state._id = action.payload;
    },
    setBanner: (state, action: PayloadAction<BannersData>) => {
      state.currentBanner = action.payload;
    },
    // Add new banner
    addBanner: (state, action: PayloadAction<BannersData>) => {
      const newId = (state.banners.length + 1).toString();
      state.banners.push({ ...action.payload, id: newId });
    },
    // Delete banner by ID
    deleteBanner: (state) => {
      if (state._id) {
        state.banners = state.banners.filter(
          (banner) => banner.id !== state._id,
        );
        state._id = undefined;
      }
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
