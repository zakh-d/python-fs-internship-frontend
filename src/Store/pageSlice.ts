import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    isLoading: boolean,
} = {
    isLoading: false,
}

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        pageStartedLoading: (state) => {
            state.isLoading = true;
        },
        pageFinishedLoading: (state) => {
            state.isLoading = false
        }
    }
});

export const { pageStartedLoading, pageFinishedLoading } = pageSlice.actions;
export default pageSlice.reducer;