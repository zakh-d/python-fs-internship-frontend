import { RootState } from "../store";

export const selectCompanies = (state: RootState) => state.companyList.companies;
export const selectComanyListLoading = (state: RootState) => state.companyList.loading;
export const selectTotalCompanies = (state: RootState) => state.companyList.totalCompanies;

export const selectCurrentCompany = (state: RootState) => state.companyProfile.company;
export const selectIsOwnerOfCompany = (state: RootState) => state.companyProfile.isOwner;
export const selectCurrentCompanyError = (state: RootState) => state.companyProfile.error;
export const selectCompanyProfileLoading = (state: RootState) => state.companyProfile.loading;