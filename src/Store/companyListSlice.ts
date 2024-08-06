import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import companyApi from "../Api/company-api";
import Company from "../Types/CompanyType";

export const fetchComapnies = createAsyncThunk<
    {
        companies: Company[],
        totalCount: number
    },
    {page: number, limit: number},
    {
        rejectValue: string
    }
    >("companyList/fetchCompanies", async ({page, limit}, thunkAPI) => {
    try {
        const response = await companyApi.getComanies(page, limit);
        return {
            companies: response.data.companies,
            totalCount: response.data.total_count
        };
    } catch (error) {
        return thunkAPI.rejectWithValue('error');
    }
});

const initialState: {
    companies: Company[],
    currentPage: number,
    companiesPerPage: number,
    totalCompanies: number,
    loading: boolean,
    error: any
} = {
    companies: [],
    currentPage: 1,
    companiesPerPage: 10,
    totalCompanies: 0,
    loading: false,
    error: null
};

const slice = createSlice({
    name: "companyList",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchComapnies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchComapnies.fulfilled, (state, action) => {
            state.loading = false;
            state.companies = action.payload.companies;
            state.totalCompanies = action.payload.totalCount;
        });
        builder.addCase(fetchComapnies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    } 
});

export default slice.reducer;