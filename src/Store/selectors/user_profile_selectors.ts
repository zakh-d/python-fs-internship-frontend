import { RootState } from "../store";

export const selectCurrentUser = (state: RootState) => state.userProfile.user;
export const selectIsFetching = (state: RootState) => state.userProfile.fetching;
export const selectDeleteFetching = (state: RootState) => state.userProfile.fetchingDelete;
export const selectIsMe = (state: RootState) => state.userProfile.isMe;
export const selectErrors = (state: RootState) => state.userProfile.errors;