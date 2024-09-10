import { RootState } from "../store";

export const selectCurrentUser = (state: RootState) => state.userProfile.user;
export const selectIsFetching = (state: RootState) => state.userProfile.fetching;
export const selectDeleteFetching = (state: RootState) => state.userProfile.fetchingDelete;
export const selectPasswordChangeFetching = (state: RootState) => state.userProfile.fetchingPasswordChange;
export const selectIsMe = (state: RootState) => state.userProfile.isMe;
export const selectErrors = (state: RootState) => state.userProfile.errors;
export const selectCompletions = (state: RootState) => state.userProfile.completions;
export const selectUserCumulativeRating = (state: RootState) => state.userProfile.cumulativeRating;