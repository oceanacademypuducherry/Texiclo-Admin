import { configureStore } from "@reduxjs/toolkit";
import { BannerReducer, CategoryReducer, CollectionReducer } from "../features";

export const store = configureStore({
  reducer: {
    categories: CategoryReducer,
    collections: CollectionReducer,
    banners: BannerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
