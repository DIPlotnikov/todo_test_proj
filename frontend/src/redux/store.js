import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

/**
 * Redux store для управления состоянием приложения
 */
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});
