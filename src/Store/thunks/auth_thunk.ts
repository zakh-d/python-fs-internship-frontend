import { authApi } from "../../Api/auth-api";
import User from "../../Types/UserType";
import { eraseAuthInfo, setMe } from "../authSlice";
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