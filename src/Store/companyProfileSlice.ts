import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CompanyDetail } from "../Types/CompanyType"
import companyApi from "../Api/company-api";
import { RootState } from "./store";
import { selectMe } from "./selectors/auth_selector";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { customNavigator } from "../Utils/_helper";
import User from "../Types/UserType";

const initialState : {
    company: CompanyDetail | null,
    loading: boolean,
    isOwner: boolean,
    error: string | null,
    invites: User[],
    requests: User[],
    members: User[],
} = {
    company: null,
    loading: false,
    isOwner: false,
    error: null,
    invites: [],
    requests: [],
    members: [],
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

export const fetchCompanyInvites = createAsyncThunk<
    User[],
    string,
    {rejectValue: string}
>('companyProfile/fetchCompanyInvites', async (id, {rejectWithValue}) => {
    try {
        const response = await companyApi.getCompanyInvites(id);
        return response.data.users;
    } catch (error) {
        return rejectWithValue('Error fetching invites');
    }
});

export const fetchCompanyMembers = createAsyncThunk<
    User[],
    string,
    {rejectValue: string}
>('companyProfile/fetchCompanyMembers', async (id, {rejectWithValue}) => {
    try {
        const response = await companyApi.getCompanyMembers(id);
        return response.data.users;
    } catch (error) {
        return rejectWithValue('Error fetching invites');
    }
});


export const fetchCompanyRequests = createAsyncThunk<
    User[],
    string,
    {rejectValue: string}
>('companyProfile/fetchCompanyRequests', async (id, {rejectWithValue}) => {
    try {
        const response = await companyApi.getCompanyRequests(id);
        return response.data.users;
    } catch (error) {
        return rejectWithValue('Error fetching invites');
    }
});


export const fetchCancelUserInvite = createAsyncThunk<
    void,
    {companyId: string, userId: string},
    {rejectValue: string}
>('companyProfile/fetchCancelUserInvite', async ({companyId, userId}, {rejectWithValue, dispatch}) => {
    try {
        await companyApi.cancelUserInvite(companyId, userId);
        dispatch(removeUserInvite(userId));
        toast.success('Invite canceled');
    } catch (error) {
        toast.error('Error canceling invite');
        return rejectWithValue('Error canceling invite');
    }
});

export const fetchAcceptUserRequest = createAsyncThunk<
    void,
    {companyId: string, userId: string},
    {rejectValue: string}
>('companyProfile/fetchAcceptUserRequest', async ({companyId, userId}, {rejectWithValue, dispatch}) => {
    try {
        await companyApi.acceptUserRequest(companyId, userId);
        dispatch(removeUserRequest(userId));
        toast.success('User request accepted');
    } catch (error) {
        toast.error('Error accepting user request');
        return rejectWithValue('Error accepting user request');
    }
});

export const fetchRejectUserRequest = createAsyncThunk<
    void,
    {companyId: string, userId: string},
    {rejectValue: string}
>('companyProfile/fetchAcceptUserRequest', async ({companyId, userId}, {rejectWithValue, dispatch}) => {
    try {
        await companyApi.rejectUserRequest(companyId, userId);
        dispatch(removeUserRequest(userId));
        toast.success('User request rejected');
    } catch (error) {
        toast.error('Error rejecting user request');
        return rejectWithValue('Error accepting user request');
    }
});


export const fetchRemoveMember = createAsyncThunk<
    void,
    {companyId: string, userId: string},
    {rejectValue: string}
    >('companyProfile/fetchRemoveMember', async ({companyId, userId}, {rejectWithValue, dispatch}) => {
        try {
            await companyApi.removeCompanyMember(companyId, userId);
            toast.success('Member removed');
            dispatch(removeMember(userId));
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.detail || 'Member was not found or deleted');
                return rejectWithValue(error.response?.data.detail || 'Member was not found or deleted');
            }
            toast.error('Unknown error removing member');
            return rejectWithValue('Error removing member');
        }
    }
);

export const fetchInviteUser = createAsyncThunk<
    void,
    {companyId: string, userEmail: string},
    {rejectValue: string}
>('companyProfile/fetchInviteUser', async ({companyId, userEmail}, {rejectWithValue}) => {
    try {
        await companyApi.inviteUser(companyId, userEmail);
        toast.success('User invited');
    } catch (error) {
        if (error instanceof AxiosError ) {
            const message = error.response?.data.detail || 'Error inviting user';
            toast.error(message);
            return rejectWithValue(message);
        }
        toast.error('Error inviting user');
        return rejectWithValue('Error inviting user');
    }
});

const companyProfileSlice = createSlice({
    name: 'companyProfile',
    initialState,
    reducers: {
        removeUserInvite: (state, action) => {
            state.invites = state.invites.filter(user => user.id !== action.payload);
        },
        removeUserRequest: (state, action) => {
            state.requests = state.requests.filter(user => user.id !== action.payload);
        },
        removeMember: (state, action) => {
            state.members = state.members.filter(user => user.id !== action.payload);
        }
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

        builder.addCase(fetchCompanyInvites.fulfilled, (state, action) => {
            state.invites = action.payload;
        });
        
        builder.addCase(fetchCompanyMembers.fulfilled, (state, action) => {
            state.members = action.payload;
        });

        builder.addCase(fetchCompanyRequests.fulfilled, (state, action) => {
            state.requests = action.payload;
        });
    }
});

const { removeUserInvite, removeUserRequest, removeMember } = companyProfileSlice.actions;
export default companyProfileSlice.reducer;