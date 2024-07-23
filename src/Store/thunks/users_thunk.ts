import { userApi } from "../../Api/users-api";
import ServerValidationError from "../../Types/ServerValidationError";
import SignUpSchema from "../../Types/SignUpSchema";
import { AppDispatch } from "../store";
import { userListFetchFailed, userListFetchStarted, userListFetchSuccess } from "../userListSlice";
import { signUpFailed, signUpStarted, signUpSuccess } from "../userSlice";
import { RootState } from "../store";
import { userProfileFetchStarted, userProfileFetchFailed, userProfileFetchSuccess } from "../user_profile_slice";
import { selectMe } from "../selectors/auth_selector";

export const signUp = (user: SignUpSchema) => async (dispatch: AppDispatch) => {
    dispatch(signUpStarted());
    try {
        await userApi.signUp(user);
        dispatch(signUpSuccess());
    } catch (error) {
        if (error instanceof ServerValidationError) {
            dispatch(signUpFailed(error.errors));
        } else {
            dispatch(signUpFailed(["An error occurred. Please try again later."]));
        }
    }
};

export const getUsers = () => async (dispatch: AppDispatch) => {
    dispatch(userListFetchStarted());
    try {
        const data = await userApi.list();
        dispatch(userListFetchSuccess({
            list: data.users,
            currentPage: 1,
            totalPages: 1,
        }));
    } catch (error) {
        dispatch(userListFetchFailed(["An error occurred. Please try again later."]));
    }
}

export const getUser = (userId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(userProfileFetchStarted());
    try {
        const data = await userApi.get(userId);
        const me = selectMe(getState());
        dispatch(userProfileFetchSuccess({
            user: data,
            isMe: me?.id === userId
        }));
    } catch (error) {
        dispatch(userProfileFetchFailed(["An error occurred. Please try again later."]));
    }
}

export default signUp;