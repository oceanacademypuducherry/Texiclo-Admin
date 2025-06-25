import { configureStore } from "@reduxjs/toolkit";
import {
  AuthReducer,
  BannerReducer,
  CategoryReducer,
  CollectionReducer,
  FilterReducer,
  GsmReducer,
} from "../features";

export const store = configureStore({
  reducer: {
    categories: CategoryReducer,
    collections: CollectionReducer,
    banners: BannerReducer,
    auth: AuthReducer,
    filter: FilterReducer,
    gsm: GsmReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
