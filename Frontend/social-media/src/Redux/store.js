import { configureStore } from "@reduxjs/toolkit";
import userslice from "../Redux/userslice.js"
export const store=configureStore({
    reducer:{
    user:userslice
    }
})