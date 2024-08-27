import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AverageScoreByQuizes, AverageScoreOfUsers } from "../Types/QuizzTypes";
import companyApi from "../Api/company-api";
import { pageFinishedLoading, pageStartedLoading } from "./pageSlice";
import { userApi } from "../Api/users-api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type StateProps = {
    averageScoresForMembers: AverageScoreOfUsers[],
    averageScoresByQuizzes: AverageScoreByQuizes[],
}

const initialState: StateProps = {
    averageScoresForMembers: [],
    averageScoresByQuizzes: [],
}

export const fetchMembersAverageScores = createAsyncThunk<
AverageScoreOfUsers[],
{
    companyId: string
},
{}
>(
    "analytics/fetchMembersAverageScores",
    async ({companyId}, {dispatch}) => {
        try {
            dispatch(pageStartedLoading());
            const response = await companyApi.membersAverageScoresAnalytics(companyId);
            return response.data;
        } catch (error) {
            
        } finally {
            dispatch(pageFinishedLoading());
        }
    }
)


export const fetchAverageUserScoreByQuizzes = createAsyncThunk<
AverageScoreByQuizes[],
{
    userId: string
},
{}>(
    "analytics/fetchAverageUserScoreByQuizzes",
    async ({userId}, {dispatch}) => {
        try {
            dispatch(pageStartedLoading());
            const response = await userApi.getUserScoreByQuizzes(userId);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.detail);
            }
        } finally {
            dispatch(pageFinishedLoading());
        }
    }
)

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchMembersAverageScores.fulfilled, (state, action) => {
            state.averageScoresForMembers = action.payload;
        });

        builder.addCase(fetchAverageUserScoreByQuizzes.fulfilled, (state, action) => {
            state.averageScoresByQuizzes = action.payload;
        });
    }
});

export const {} = analyticsSlice.actions;
export default analyticsSlice.reducer;