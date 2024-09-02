import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./testSlice";
import healthReducer from "./healthSlice";
import authReducer from "./authSlice";
import usersReducer from "./userSlice";
import usersListReducer from "./userListSlice";
import userProfileReducer from "./userProfileSlice";
import companyListReducer from "./companyListSlice";
import companyProfileReducer from "./companyProfileSlice";
import pageReducer from "./pageSlice";
import companyActionUserReducer from "./companyActionUserSlice";
import quizzReducer from "./quizzSlice";
import quizzWorkflowReducer from "./quizzWorkflowSlice";
import analyticsReducer from "./analyticsSlice";
import notificationReducer from "./notificationSlice";

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
        companyActionUser: companyActionUserReducer,
        quizz: quizzReducer,
        quizzWorkflow: quizzWorkflowReducer,
        analytics: analyticsReducer,
        notification: notificationReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
