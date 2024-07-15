import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./testSlice";
import healthReducer from "./healthSlice";

const store = configureStore({
    reducer: {
        test: testReducer,
        health: healthReducer
    }
});

export default store;