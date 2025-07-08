// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";

// Reducers
import {
  AuthReducer,
  BannerReducer,
  CategoryReducer,
  CollectionReducer,
  ColorReducer,
  GsmReducer,
  SizeReducer,
  productReducer,
  productFormReducer,
} from "../features";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["productForm", "product"], // persist only these slices
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  banners: BannerReducer,
  categories: CategoryReducer,
  collections: CollectionReducer,
  color: ColorReducer,
  gsm: GsmReducer,
  size: SizeReducer,
  product: productReducer,
  productForm: productFormReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable to support non-serializables like File
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
