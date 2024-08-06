import { RootState } from "../store";

export const selectCompanies = (state: RootState) => state.companyList.companies;
export const selectComanyListLoading = (state: RootState) => state.companyList.loading;
export const selectTotalCompanies = (state: RootState) => state.companyList.totalCompanies;