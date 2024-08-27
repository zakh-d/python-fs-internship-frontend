import { RootState } from "../store";

export const selectAverageMembersScores = (state: RootState) => state.analytics.averageScoresForMembers;