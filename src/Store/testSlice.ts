import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
    name: "test",
    initialState: {
        testString: "test"
    },
    reducers: {
        changeTestString: (state, action) => {
            state.testString = action.payload;
        }
    }
});

export const { changeTestString } = testSlice.actions;
export default testSlice.reducer;