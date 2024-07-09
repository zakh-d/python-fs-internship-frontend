import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
    name: "test",
    initialState: {
        testString: "Hi there for the first time!"
    },
    reducers: {
        changeTestString: (state, action) => {
            state.testString = action.payload;
        }
    }
});

export const { changeTestString } = testSlice.actions; // Export the action creator
export default testSlice.reducer; // Export the reducer