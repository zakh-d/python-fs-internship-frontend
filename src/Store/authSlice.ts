import { createSlice } from "@reduxjs/toolkit"
import User from "../Types/UserType"

const initialState: {
    isAuthenticated: boolean,
    me: User | null,
    loginStatus: "idle" | "fetching" | "failed"
} = {
    isAuthenticated: false,
    me: null,
    loginStatus: "idle",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        eraseAuthInfo: (state) => {
            state.isAuthenticated = false;
            state.me = null;
        },
        setMe: (state, action) => {
            state.me = action.payload;
            state.isAuthenticated = true;
        },
        loginStarted: (state) => {
            state.loginStatus = "fetching";
        },
        loginSuccess: (state) => {
            state.loginStatus = "idle";
        },
        loginFailed: (state) => {
            state.loginStatus = "failed";
        }
    }
});


export const { eraseAuthInfo, setMe, loginStarted, loginSuccess, loginFailed } = authSlice.actions;
export default authSlice.reducer;