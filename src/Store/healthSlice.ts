import { createSlice } from "@reduxjs/toolkit";
import HealthInfo from "../Types/HealthInfo";


const initialState : {
    app: HealthInfo,
    redis: HealthInfo,
    db: HealthInfo
} = {
    app: {
        status_code: 0,
        details: "",
        result: ""
    },
    redis: {
        status_code: 0,
        details: "",
        result: ""
    },
    db: {
        status_code: 0,
        details: "",
        result: ""
    }
}

const healthSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        setHealth: (state, action) => {
            state.app = action.payload.app;
            state.redis = action.payload.redis;
            state.db = action.payload.db;
        },
        setAppHealth: (state, action) => {
            state.app = action.payload;
        },
        setRedisHealth: (state, action) => {
            state.redis = action.payload;
        },
        setDbHealth: (state, action) => {
            state.db = action.payload;
        }
    }
});

export const { setHealth, setAppHealth, setDbHealth, setRedisHealth } = healthSlice.actions; // Export the action creator
export default healthSlice.reducer; // Export the reducer