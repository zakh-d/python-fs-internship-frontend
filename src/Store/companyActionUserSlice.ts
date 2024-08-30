import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Company from "../Types/CompanyType";
import { selectMe } from "./selectors/auth_selector";
import { RootState } from "./store";
import { userApi } from "../Api/users-api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { pageFinishedLoading, pageStartedLoading } from "./pageSlice";
import { setIsMember } from "./companyProfileSlice";


const initialState: {
    invites: Company[],
    requests: Company[],
} = {
    invites: [],
    requests: [],
};

export const fetchUserRequests = createAsyncThunk<
Company[],
undefined,
{
    rejectValue: string
}>('companyActionUser/getRequests', async (_, {rejectWithValue, dispatch, getState}) => {
    const me = selectMe(getState() as RootState);
    if (!me) return;
    dispatch(pageStartedLoading());
    try {
        const response = await userApi.getRequests(me.id);
        dispatch(pageFinishedLoading());
        return response.data.companies
    } catch (error) {
        dispatch(pageFinishedLoading());
        if (error instanceof AxiosError) {
            const message = error.response?.data.detail;
            if (message) {
                toast.error(message);
            }
            return rejectWithValue('Error fetching requests');
        }
    }
});

export const fetchRequestToJoinCompany = createAsyncThunk<
    void,
    Company,
    {
        rejectValue: string
    }
>(
    'companyActionUser/requestToJoinCompany',
    async (company, {getState, rejectWithValue, dispatch}) => {
        const me = selectMe(getState() as RootState);
        if (!me) return;
        dispatch(pageStartedLoading())
        try {
            await userApi.requestToJoin(me.id, company.id);
            dispatch(pageFinishedLoading());
            dispatch(setIsMember('pending_request'));
            toast.success('Request sent');
        } catch (error) {
            dispatch(pageFinishedLoading());
            if (error instanceof AxiosError) {
                const message = error.response?.data.detail;
                if (message) {
                    toast.error(message);
            }
            return rejectWithValue('Error requesting to join company');
        }
    }
});

export const fetchCancelRequest = createAsyncThunk<
    void,
    string,
    {
        rejectValue: string
    }
>('companyActionUser/cancelRequest', async (companyId, {getState, rejectWithValue, dispatch}) => {
    const me = selectMe(getState() as RootState);
    if (!me) return;
    dispatch(pageStartedLoading());
    try {
        await userApi.cancelRequest(me.id, companyId);
        dispatch(pageFinishedLoading());
        dispatch(removeRequest(companyId));
        dispatch(setIsMember('no'));
    } catch (error) {
        dispatch(pageFinishedLoading());
        if (error instanceof AxiosError) {
            const message = error.response?.data.detail;
            if (message) {
                toast.error(message);
            }
            return rejectWithValue('Error cancelling request');
        }
    }
});


export const fetchUserInvites = createAsyncThunk<
    Company[],
    undefined,
    {
        rejectValue: string
    }
>('companyActionUser/getInvites', async (_, {rejectWithValue, dispatch, getState}) => {
    const me = selectMe(getState() as RootState);
    if (!me) return;
    dispatch(pageStartedLoading());
    try {
        const response = await userApi.getInvites(me.id);
        dispatch(pageFinishedLoading());
        return response.data.companies;
    } catch (error) {
        dispatch(pageFinishedLoading());
        if (error instanceof AxiosError) {
            const message = error.response?.data.detail;
            if (message) {
                toast.error(message);
            }
            return rejectWithValue('Error fetching invites');
        }
    }
});

export const fetchAcceptInvite = createAsyncThunk<
    void,
    string,
    {
        rejectValue: string
    }
>('companyActionUser/acceptInvite', async (companyId, {getState, rejectWithValue, dispatch}) => {
    const me = selectMe(getState() as RootState);
    if (!me) return;
    dispatch(pageStartedLoading());
    try {
        await userApi.acceptInvite(me.id, companyId);
        dispatch(pageFinishedLoading());
        dispatch(removeInvite(companyId));
    } catch (error) {
        dispatch(pageFinishedLoading());
        if (error instanceof AxiosError) {
            const message = error.response?.data.detail;
            if (message) {
                toast.error(message);
            }
            return rejectWithValue('Error accepting invite');
        }
    }
});


export const fetchDeclineInvite = createAsyncThunk<
    void,
    string,
    {
        rejectValue: string
    }
>('companyActionUser/declineInvite', async (companyId, {getState, rejectWithValue, dispatch}) => {
    const me = selectMe(getState() as RootState);
    if (!me) return;
    dispatch(pageStartedLoading());
    try {
        await userApi.rejectInvite(me.id, companyId);
        dispatch(pageFinishedLoading());
        dispatch(removeInvite(companyId));
    } catch (error) {
        dispatch(pageFinishedLoading());
        if (error instanceof AxiosError) {
            const message = error.response?.data.detail;
            if (message) {
                toast.error(message);
            }
            return rejectWithValue('Error declining invite');
        }
    }
});

const comapnyActionUserSlice = createSlice({
    name: 'companyActionUser',
    initialState,
    reducers: {
        removeInvite: (state, action) => {
            state.invites = state.invites?.filter((company) => company.id !== action.payload) || null;
        },
        removeRequest: (state, action) => {
            state.requests = state.requests?.filter((company) => company.id !== action.payload) || null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRequestToJoinCompany.fulfilled, (state, action) => {
            state.requests?.push(action.meta.arg);
        });

        builder.addCase(fetchUserRequests.fulfilled, (state, action) => {
            state.requests = action.payload;
        });
         
        builder.addCase(fetchUserInvites.fulfilled, (state, action) => {
            state.invites = action.payload;
        });
    }
});

export const { removeInvite, removeRequest } = comapnyActionUserSlice.actions;
export default comapnyActionUserSlice.reducer;