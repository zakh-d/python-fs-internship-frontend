import { createSlice } from "@reduxjs/toolkit";
import { UserDetail } from "../Types/UserType";

type UserProfileType = {
    fetching: boolean,
    fetchingDelete: boolean,
    fetchingPasswordChange: boolean,
    user?: UserDetail,
    isMe: boolean,
    errors?: string[],
}

const initialState: UserProfileType = {
    fetching: false,
    fetchingDelete: false,
    fetchingPasswordChange: false,
    user: undefined,
    isMe: false,
}

const userProfilesSlice = createSlice({
    name: "userProfile",
    initialState: initialState,
    reducers: {
        userProfileFetchStarted: (state) => {
            state.fetching = true;
        },
        userProfileFetchSuccess: (state, action) => {
            state.fetching = false;
            state.user = action.payload.user;
            state.isMe = action.payload.isMe;
        },
        userProfileFetchFailed: (state, action) => {
            state.fetching = false;
            state.errors = action.payload;
        },
        deleteFetchiStarted: (state) => {
            state.fetchingDelete = true;
        },
        deleteFetchFinished: (state) => {
            state.fetchingDelete = false;
        },
        eraseErrors: (state) => {
            state.errors = [];
        },
        passwordChangeStarted: (state) => {
            state.fetchingPasswordChange = true;
        },
        passwordChangeFinished: (state) => {
            state.fetchingPasswordChange = false;
        }
    }
});

export default userProfilesSlice.reducer
export const { 
    userProfileFetchStarted,
    userProfileFetchSuccess,
    userProfileFetchFailed,
    deleteFetchFinished,
    deleteFetchiStarted,
    eraseErrors,
    passwordChangeStarted,
    passwordChangeFinished
} = userProfilesSlice.actions