import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDetail } from "../Types/UserType";
import { QuizzCompletionInfo } from "../Types/QuizzTypes";
import { userApi } from "../Api/users-api";
import { pageFinishedLoading, pageStartedLoading } from "./pageSlice";

type UserProfileType = {
    fetching: boolean,
    fetchingDelete: boolean,
    fetchingPasswordChange: boolean,
    user?: UserDetail,
    isMe: boolean,
    cumulativeRating: number,
    errors?: string[],
    completions?: QuizzCompletionInfo[]
}

const initialState: UserProfileType = {
    fetching: false,
    fetchingDelete: false,
    fetchingPasswordChange: false,
    user: undefined,
    cumulativeRating: 0,
    isMe: false,
}

export const fetchUserLastestQuizzCompletions = createAsyncThunk<
QuizzCompletionInfo[],
{userId: string},
{rejectValue: string}
>('userProfiles/fetchUserLastestQuizzCompletions', async ({userId}, {rejectWithValue, dispatch}) => {
    try {
        dispatch(pageStartedLoading());
        const response = await userApi.getLastestQuizzCompletions(userId);
        return response.data;
    } catch (error) {
        return rejectWithValue("Failed to fetch user's quizz completions");
    } finally {
        dispatch(pageFinishedLoading());
    }
});

export const fetchUserRating = createAsyncThunk<
number,
{userId: string},
{}>
('userProfiles/fetchUserRating', async ({userId}, {dispatch}) => {
    dispatch(pageStartedLoading());
    const response = await userApi.getUserRating(userId);
    dispatch(pageFinishedLoading());
    return response.data.score;
});

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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserLastestQuizzCompletions.fulfilled, (state, action) => {
            state.completions = action.payload;
        });

        builder.addCase(fetchUserRating.fulfilled, (state, action) => {
            state.cumulativeRating = action.payload;
        });
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