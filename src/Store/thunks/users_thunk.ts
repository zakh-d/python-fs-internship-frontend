import { userApi } from "../../Api/users-api";
import ServerValidationError from "../../Types/ServerValidationError";
import SignUpSchema from "../../Types/SignUpSchema";
import { AppDispatch } from "../store";
import { signUpFailed, signUpStarted, signUpSuccess } from "../userSlice";

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

export default signUp;