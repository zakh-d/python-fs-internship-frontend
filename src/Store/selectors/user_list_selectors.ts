import { RootState } from "../store";

export const selectIsFetching = (state: RootState) => state.usersList.fetching;
export const selectUsers = (state: RootState) => state.usersList.list;
export const selectCurrentPage = (state: RootState) => state.usersList.currentPage;
export const selectTotalPages = (state: RootState) => state.usersList.totalPages;
