// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createIdbStorage from "redux-persist-indexeddb-storage";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage
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
  productOptionsReducer,
  productListReducer,
  productDetailReducer,
  filterReducer,
} from "../features";

const persistConfig = {
  key: "root",
  storage: createIdbStorage({
    name: "texiclo-admin",
    storeName: "product-form",
  }),
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
  productFormOptions: productOptionsReducer,
  productList: productListReducer,
  productDetial: productDetailReducer,
  filteroptions: filterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable to support non-serializables like File
    }),
  devTools: process.env.NODE_ENV !== "production" && {
    trace: true,
    traceLimit: 25,
    actionsDenylist: [
      "productForm/setFormData",
      "productForm/updateVariantImage",
    ],
    stateSanitizer: (state) => ({
      ...state,
      // productForm: "[REDACTED]", // optional: sanitize entire productForm slice
    }),
    actionSanitizer: (action) =>
      action.type.startsWith("productForm/")
        ? { ...action, payload: "[LARGE_PAYLOAD_REDACTED]" }
        : action,
  },
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
