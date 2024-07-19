import { createSlice } from "@reduxjs/toolkit"
import User from "../Types/UserType"

const initialState: {
    isAuthenticated: boolean,
    me: User | null
} = {
    isAuthenticated: false,
    me: null
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
        }
    }
});


export const { eraseAuthInfo, setMe } = authSlice.actions;
export default authSlice.reducer;