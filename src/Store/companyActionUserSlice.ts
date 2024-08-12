import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Company from "../Types/CompanyType";
import { selectMe } from "./selectors/auth_selector";
import { RootState } from "./store";
import { userApi } from "../Api/users-api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { pageFinishedLoading, pageStartedLoading } from "./pageSlice";


const initialState: {
    invites: Company[],
    requests: Company[],
} = {
    invites: [],
    requests: [],
};

export const getRequests = createAsyncThunk<
Company[],
string,
{
    rejectValue: string
}>('companyActionUser/getRequests', async (userId, {rejectWithValue, dispatch}) => {
    dispatch(pageStartedLoading());
    try {
        const response = await userApi.getRequests(userId);
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
            toast.success('Request sent');
            dispatch(addRequest(company));
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
    Company,
    {
        rejectValue: string
    }
>('companyActionUser/cancelRequest', async (company, {getState, rejectWithValue, dispatch}) => {
    const me = selectMe(getState() as RootState);
    if (!me) return;
    dispatch(pageStartedLoading());
    try {
        await userApi.cancelRequest(me.id, company.id);
        dispatch(pageFinishedLoading());
        dispatch(removeRequest(company.id));
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


export const fetchAcceptInvite = createAsyncThunk<
    void,
    Company,
    {
        rejectValue: string
    }
>('companyActionUser/acceptInvite', async (company, {getState, rejectWithValue, dispatch}) => {
    const me = selectMe(getState() as RootState);
    if (!me) return;
    dispatch(pageStartedLoading());
    try {
        await userApi.acceptInvite(me.id, company.id);
        dispatch(pageFinishedLoading());
        dispatch(removeInvite(company.id));
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
    Company,
    {
        rejectValue: string
    }
>('companyActionUser/declineInvite', async (company, {getState, rejectWithValue, dispatch}) => {
    const me = selectMe(getState() as RootState);
    if (!me) return;
    dispatch(pageStartedLoading());
    try {
        await userApi.rejectInvite(me.id, company.id);
        dispatch(pageFinishedLoading());
        dispatch(removeInvite(company.id));
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
            state.invites = state.invites.filter((company) => company.id !== action.payload);
        },
        removeRequest: (state, action) => {
            state.requests = state.requests.filter((company) => company.id !== action.payload);
        },
        addRequest: (state, action) => {
            state.requests.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRequestToJoinCompany.fulfilled, (state, action) => {
            state.requests.push(action.meta.arg);
        });

        builder.addCase(getRequests.fulfilled, (state, action) => {
            state.requests = action.payload;
        });
    }
});

export const { removeInvite, removeRequest, addRequest } = comapnyActionUserSlice.actions;
export default comapnyActionUserSlice.reducer;