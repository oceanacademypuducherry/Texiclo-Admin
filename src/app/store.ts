import { configureStore } from "@reduxjs/toolkit";
import {
  AuthReducer,
  BannerReducer,
  CategoryReducer,
  CollectionReducer,
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
    size:SizeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
