import { RootState } from "../store";

export const selectUserInvites = (state: RootState) => state.companyActionUser.invites;
export const selectUserRequests = (state: RootState) => state.companyActionUser.requests;