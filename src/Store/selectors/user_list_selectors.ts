import { RootState } from "../store";

export const selectIsFetching = (state: RootState) => state.usersList.fetching;
export const selectUsers = (state: RootState) => state.usersList.list;
export const selectTotalCount = (state: RootState) => state.usersList.totalCount;
