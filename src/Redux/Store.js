import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import cartSlice from "./Slices/cartSlice";

const Store = configureStore({
    reducer:{
        'user' : userSlice,
        'cart' : cartSlice,
    }
})

export default Store;