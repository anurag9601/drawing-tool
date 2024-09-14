import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "@/pages/slice/menuSlice";
import toolKitReducer from "@/pages/slice/toolboxSlice";

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        toolkit: toolKitReducer
    }
})