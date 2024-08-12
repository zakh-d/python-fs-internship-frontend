import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import companyApi from "../Api/company-api";
import Company from "../Types/CompanyType";
import { toast } from "react-toastify";
import { customNavigator } from "../Utils/_helper";

export const fetchComapnies = createAsyncThunk<
    {
        companies: Company[],
        totalCount: number
    },
    {page: number, limit: number, myCompanies?: boolean},
    {
        rejectValue: string
    }
    >("companyList/fetchCompanies", async ({page, limit, myCompanies}, thunkAPI) => {
    try {
        let response = await (myCompanies ? companyApi.getMyCompanies(page, limit) : companyApi.getComanies(page, limit));
        return {
            companies: response.data.companies,
            totalCount: response.data.total_count
        };
    } catch (error) {
        return thunkAPI.rejectWithValue('error');
    }
});

export const fetchCreateNewCompany = createAsyncThunk<
    Company,
    {name: string, description: string, hidden: boolean},
    {
        rejectValue: string
    }
    >("companyList/fetchCreateNewCompany", async ({name, description, hidden}, thunkAPI) => {
    try {
        const response = await companyApi.createCompany({name, description, hidden});
        const newCompany = response.data;
        toast.success('Company: \'' + newCompany.name +'\' created');
        customNavigator.navigate?.(`/companies/${newCompany.id}`);
        return newCompany;
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