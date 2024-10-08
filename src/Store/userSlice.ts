import { createSlice } from "@reduxjs/toolkit";


type UserState = {
    userCreation: {
        status: "idle" | "fetching" | "failed" | "success",
        errors: string[],
    }
}

const initialState: UserState = {
    userCreation: {
        status: "idle",
        errors: [],
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signUpStarted: (state) => {
            state.userCreation.status = "fetching";
        },
        signUpSuccess: (state) => {
            state.userCreation.status = "success";
        },
        signUpReset: (state) => {
            state.userCreation.status = "idle";
        },
        signUpFailed: (state, action) => {
            state.userCreation.status = "failed";
            state.userCreation.errors = action.payload;
        },
    }
});

export const { signUpStarted, signUpSuccess, signUpFailed, signUpReset } = userSlice.actions;
export default userSlice.reducer;