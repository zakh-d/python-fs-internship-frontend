import ServerValidationError from "../Types/ServerValidationError";
import SignUpSchema from "../Types/SignUpSchema";
import apiBase from "./api-configuration";

interface HasMessage {
    msg: string;
}

export const userApi = {
    signUp: async (signUpSchema: SignUpSchema) => {

        const response = await apiBase.post("users/sign_up/", {
            username: signUpSchema.username,
            first_name: signUpSchema.first_name,
            last_name: signUpSchema.last_name,
            email: signUpSchema.email,
            password:  signUpSchema.password,
            password_confirmation: signUpSchema.password_confirm
        }).catch((error) => {
            const data = error.response.data;

            if (error.response.status === 400) {
                throw new ServerValidationError([data.detail]);
            }
            if (error.response.status === 422) {
                const errors = data.detail.map((d: HasMessage) => d.msg);
                throw new ServerValidationError(errors);
            }
            throw new Error("An error occurred. Please try again later.");

        });

        return response.data;
    }
}