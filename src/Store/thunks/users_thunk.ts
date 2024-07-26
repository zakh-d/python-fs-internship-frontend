import { userApi } from "../../Api/users-api";
import ServerValidationError from "../../Types/ServerValidationError";
import SignUpSchema from "../../Types/SignUpSchema";
import { AppDispatch } from "../store";
import { userListFetchFailed, userListFetchStarted, userListFetchSuccess } from "../userListSlice";
import { signUpFailed, signUpStarted, signUpSuccess } from "../userSlice";
import { RootState } from "../store";
import { userProfileFetchStarted, userProfileFetchFailed, userProfileFetchSuccess, deleteFetchiStarted, deleteFetchFinished, passwordChangeStarted, passwordChangeFinished } from "../user_profile_slice";
import { selectMe } from "../selectors/auth_selector";
import { eraseAuthInfo } from "../authSlice";
import { UserUpdate } from "../../Types/UserType";
import { getCurrentUser } from "./auth_thunk";
import { setToast } from "../toast_slice";

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

export const getUsers = (page: number) => async (dispatch: AppDispatch) => {
    dispatch(userListFetchStarted());
    try {
        const data = await userApi.list(page);
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

export const updateUser = (userId: string, new_data: UserUpdate) => async (dispatch: AppDispatch) => {
    dispatch(userProfileFetchStarted());
    try {
        const data = await userApi.update(new_data, userId);
        dispatch(userProfileFetchSuccess({
            user: data,
            isMe: true, // This is always true because the user is updating their own profile
        }));
        dispatch(getCurrentUser());
        dispatch(setToast({
            message: "User updated successfully",
            type: "success"
        }));
    } catch (error) {
        if (error instanceof ServerValidationError) {
            dispatch(userProfileFetchFailed(error.errors));
        }
        else {

            dispatch(userProfileFetchFailed(['Unknown error occurred. Please try again later.']));
        }
    }
}

export const updatePassword = (userId: string, old_password: string, new_password: string, onSuccess: () => void) => async (dispatch: AppDispatch) => {
    dispatch(passwordChangeStarted());
    try {
        await userApi.update({
            new_password: new_password,
            password: old_password
        }, userId);
        onSuccess();
        dispatch(setToast({
            message: "Password updated successfully",
            type: "success"
        }));
    } catch (error) {
        if (error instanceof ServerValidationError) {
            dispatch(userProfileFetchFailed(error.errors));
        }
        else {
            dispatch(userProfileFetchFailed(['Unknown error occurred. Please try again later.']));
        }
    }
    dispatch(passwordChangeFinished());
}

export const deleteUser = (userId: string) => async (dispatch: AppDispatch) => {
    dispatch(deleteFetchiStarted());
    try {
        await userApi.delete(userId);
        dispatch(deleteFetchFinished());
        dispatch(eraseAuthInfo());
        localStorage.removeItem("token");
    } catch (error) {
        dispatch(userProfileFetchFailed(["An error occurred. Please try again later."]));
    }
}  