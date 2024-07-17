import SignUpSchema from "../Types/SignUpSchema";
import apiBase from "./api-configuration";

export const userApi = {
    signUp: async (signUpSchema: SignUpSchema) => {

        const response = await apiBase.post("users/sign_up/", {
            username: signUpSchema.username,
            first_name: signUpSchema.first_name,
            last_name: signUpSchema.last_name,
            email: signUpSchema.email,
            password:  signUpSchema.password,
            password_confirmation: signUpSchema.password_confirm
        });

        if (response.status !== 200) {
            const data = await response.data();

            if (response.status === 401) {
                throw new Error(data.detail);
            }

            throw new Error("An error occurred. Please try again later.");
        }

        return response.data;
    }
}