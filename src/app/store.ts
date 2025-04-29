import { configureStore } from "@reduxjs/toolkit";
import { CategoryReducer, CollectionReducer } from "../features";

export const store = configureStore({
  reducer: {
    categories: CategoryReducer,
    collections: CollectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
