import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Company from "../Types/CompanyType"
import companyApi from "../Api/company-api";
import { RootState } from "./store";
import { selectMe } from "./selectors/auth_selector";

const initialState : {
    company: Company | null,
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
    {company: Company, isOwner: boolean},
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
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export default companyProfileSlice.reducer;