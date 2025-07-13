import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    isAdmin: false,
    isAuthenticated: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.username = action.payload.username;
            state.isAdmin = action.payload.isAdmin;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.username = null;
            state.isAdmin = false;
            state.isAuthenticated = false;
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
