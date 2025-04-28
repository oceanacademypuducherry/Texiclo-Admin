import { configureStore } from "@reduxjs/toolkit";
import { CategoryReducer } from "../features/products/redux";


export const store = configureStore({
   reducer:{
    categories:CategoryReducer
   }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 