import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./testSlice";
import healthReducer from "./healthSlice";
import authReducer from "./authSlice";
import usersReducer from "./userSlice";
import usersListReducer from "./userListSlice";
import userProfileReducer from "./user_profile_slice";
import companyListReducer from "./companyListSlice";
import companyProfileReducer from "./companyProfileSlice";
import pageReducer from "./pageSlice";

const store = configureStore({
    reducer: {
        test: testReducer,
        health: healthReducer,
        auth: authReducer,
        users: usersReducer,
        usersList: usersListReducer,
        userProfile: userProfileReducer,
        companyList: companyListReducer,
        companyProfile: companyProfileReducer,
        page: pageReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
