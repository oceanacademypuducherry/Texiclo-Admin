import { configureStore } from "@reduxjs/toolkit";
import {
  AuthReducer,
  BannerReducer,
  CategoryReducer,
  CollectionReducer,
  ColorReducer,
  FilterReducer,
  GsmReducer,
  SizeReducer,
} from "../features";

export const store = configureStore({
  reducer: {
    categories: CategoryReducer,
    collections: CollectionReducer,
    banners: BannerReducer,
    auth: AuthReducer,
    filter: FilterReducer,
    gsm: GsmReducer,
    size: SizeReducer,
    color: ColorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
