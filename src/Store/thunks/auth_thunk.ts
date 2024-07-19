import { authApi } from "../../Api/auth-api";
import User from "../../Types/UserType";
import { eraseAuthInfo, loginFailed, loginStarted, loginSuccess, setMe } from "../authSlice";
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
}


export const loginUser = (username: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(loginStarted());
    try {
        const data = await authApi.login(username, password);
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