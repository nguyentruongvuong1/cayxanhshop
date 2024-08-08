import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import AuthSlice from "./AuthSlice";
export const store = configureStore({
    reducer: { 
        cart: cartSlice, auth: AuthSlice
    }
}) 