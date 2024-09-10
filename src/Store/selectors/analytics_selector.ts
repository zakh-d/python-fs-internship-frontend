import { RootState } from "../store";

export const selectAverageMembersScores = (state: RootState) => state.analytics.averageScoresForMembers;
export const selectAverageScoresByQuizzes = (state: RootState) => state.analytics.averageScoresByQuizzes;