import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./testSlice";
import healthReducer from "./healthSlice";
import authReducer from "./authSlice";
import usersReducer from "./userSlice";
import usersListReducer from "./userListSlice";

const store = configureStore({
    reducer: {
        test: testReducer,
        health: healthReducer,
        auth: authReducer,
        users: usersReducer,
        usersList: usersListReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
