import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AverageScoreOfUsers } from "../Types/QuizzTypes";
import companyApi from "../Api/company-api";
import { pageFinishedLoading, pageStartedLoading } from "./pageSlice";

type StateProps = {
    averageScoresForMembers: AverageScoreOfUsers[],
}

const initialState: StateProps = {
    averageScoresForMembers: [],
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

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchMembersAverageScores.fulfilled, (state, action) => {
            state.averageScoresForMembers = action.payload;
        })
    }
});

export const {} = analyticsSlice.actions;
export default analyticsSlice.reducer;