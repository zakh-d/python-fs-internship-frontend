import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CompanyDetail } from "../Types/CompanyType"
import companyApi from "../Api/company-api";
import { RootState } from "./store";
import { selectMe } from "./selectors/auth_selector";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { customNavigator } from "../Utils/_helper";

const initialState : {
    company: CompanyDetail | null,
    loading: boolean,
    isOwner: boolean,
    error: string | null
} = {
    company: null,
    loading: false,
    isOwner: false,
    error: null
}


export const fetchCompanyById = createAsyncThunk<
    {company: CompanyDetail, isOwner: boolean},
    string,
    {rejectValue: string}
>('companyProfile/fetchCompanyById', async (id, {getState, rejectWithValue}) => {
    try {
        const response = await companyApi.getCompanyById(id);
        const currentUser = selectMe(getState() as RootState);
        return {
            company: response.data,
            isOwner: response.data.owner.id === currentUser?.id
        }
    } catch (error) {
        return rejectWithValue('Error fetching company');
    }
});


export const fetchCompanyUpdate = createAsyncThunk<    
    {company: CompanyDetail, isOwner: boolean},
    {id: string, values: {name: string, description: string, hidden: boolean}},
    {rejectValue: string}
>('companyProfile/fetchCompanyUpdate', async ({id, values}, {getState, rejectWithValue}) => {
    
    try {
        const response = await companyApi.updateCompany(id, values);
        toast.success('Company updated');
        const currentUser = selectMe(getState() as RootState);
        return {
            company: response.data,
            isOwner: response.data.owner.id === currentUser?.id
        }
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
            toast.error('Company was not found or deleted');
            return rejectWithValue('Company was not found or deleted');
        }
        return rejectWithValue('Error updating company');
    }
});

export const fetchCompanyDelete = createAsyncThunk<
    void,
    string,
    {rejectValue: string}
>(
    'companyProfile/fetchCompanyDelete',
    async (id, {rejectWithValue}) => {
        try {
            await companyApi.deleteComapny(id);
            toast.success('Company deleted');
            customNavigator.navigate?.('companies/my');
        } catch (error) {
            toast.error('Error deleting company');
            return rejectWithValue('Error deleting company');
        }
    }
);

const companyProfileSlice = createSlice({
    name: 'companyProfile',
    initialState,
    reducers: {
        
    },
    extraReducers: builder => {
        builder.addCase(fetchCompanyById.pending, (state, _) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCompanyById.fulfilled, (state, action) => {
            state.loading = false;
            state.company = action.payload.company;
            state.isOwner = action.payload.isOwner;
        });
        builder.addCase(fetchCompanyById.rejected, (state, action) => {
            state.company = null;
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchCompanyUpdate.pending, (state, _) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCompanyUpdate.fulfilled, (state, action) => {
            state.loading = false;
            state.company = action.payload.company;
            state.isOwner = action.payload.isOwner;
        });
        builder.addCase(fetchCompanyUpdate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchCompanyDelete.pending, (state, _) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCompanyDelete.fulfilled, (state, _) => {
            state.loading = false;
            state.company = null;
        });
    }
});

export default companyProfileSlice.reducer;