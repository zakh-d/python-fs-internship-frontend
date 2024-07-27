import User from "../Types/UserType";
import { createSlice } from "@reduxjs/toolkit";

type UserListStateType = {
    fetching: boolean,
    list: User[],
    totalCount: number,
    errors?: string[],
}

const initialState: UserListStateType = {
    fetching: false,
    list: [],
    totalCount: 0,
}

const userListSlice = createSlice({
    name: "usersList",
    initialState: initialState,
    reducers: {
        userListFetchStarted: (state) => {
            state.fetching = true;
        },
        userListFetchSuccess: (state, action) => {
            state.fetching = false;
            state.list = action.payload.list;
            state.totalCount = action.payload.totalCount;
        },
        userListFetchFailed: (state, action) => {
            state.fetching = false;
            state.errors = action.payload
        }
    }
})

export const { userListFetchStarted, userListFetchSuccess, userListFetchFailed } = userListSlice.actions;
export default userListSlice.reducer;