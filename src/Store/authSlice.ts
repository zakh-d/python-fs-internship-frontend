import { createSlice } from "@reduxjs/toolkit"
import User from "../Types/UserType"

const initialState: {
    isAuthenticated: boolean,
    token: string,
    me: User | null
} = {
    isAuthenticated: false,
    token: "",
    me: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = "";
            state.isAuthenticated = false;
            state.me = null;
        },
        setMe: (state, action) => {
            state.me = action.payload;
        }
    }
});


export const { setToken, logout, setMe } = authSlice.actions;
export default authSlice.reducer;