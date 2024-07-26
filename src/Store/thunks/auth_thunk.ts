import { authApi } from "../../Api/auth-api";
import User from "../../Types/UserType";
import { eraseAuthInfo, loginFailed, loginStarted, loginSuccess, setMe, currentUserWasLoaded } from "../authSlice";
import { AppDispatch } from "../store";


export const getCurrentUser = () => async (dispatch: AppDispatch) => {

    const token: string | null = localStorage.getItem("token");
    if (!token) {
        dispatch(eraseAuthInfo());
        return;
    }

    try {
        const data: User = await authApi.me(token);
        dispatch(setMe(data));
    } catch (error) {
        if (error instanceof Error && error.message == 'Not authenticated')
        {
            localStorage.removeItem("token");
            dispatch(eraseAuthInfo());
        }
    }
    dispatch(currentUserWasLoaded());
}


export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(loginStarted());
    try {
        const data = await authApi.login(email, password);
        localStorage.setItem("token", data.access_token);
        dispatch(loginSuccess());
        dispatch(getCurrentUser());
    }
    catch (error: any) {
        if (error.code && error.code === 'ERR_NETWORK') {
            return;
        }
        dispatch(loginFailed());
    }
}

export const getAuth0Token = (getToken: Promise<string>) => async (dispatch: AppDispatch) => {
    try {
        const token = await getToken;
        localStorage.setItem("token", token);
        dispatch(loginSuccess());
        dispatch(getCurrentUser());
    } catch (error) {
        dispatch(loginFailed());
    }
}