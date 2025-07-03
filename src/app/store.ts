import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {
  AuthReducer,
  BannerReducer,
  CategoryReducer,
  CollectionReducer,
  ColorReducer,
  // FilterReducer,
  GsmReducer,
  productFormReducer,
  productReducer,
  SizeReducer,
} from "../features";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["productForm", "product"], // only persist productForm
};

export const rootReducer = combineReducers({
  categories: CategoryReducer,
  collections: CollectionReducer,
  banners: BannerReducer,
  auth: AuthReducer,
  // filter: FilterReducer,
  gsm: GsmReducer,
  size: SizeReducer,
  color: ColorReducer,
  product: productReducer,
  productForm: productFormReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Persistor for Provider
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
