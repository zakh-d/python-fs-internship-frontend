import { createSlice } from "@reduxjs/toolkit";

type ToastState = {
    message: string;
    type: "success" | "error" | "warning" | "info" | "not_set";
}

const initialState: ToastState = {
    message: "",
    type: "not_set"
}

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        setToast: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        clearToast: (state) => {
            state.message = "";
            state.type = "not_set";
        }
    }
});


export const { setToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;