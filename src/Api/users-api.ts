import apiBase from "./api-configuration";

export const userApi = {
    signUp: async (
        username: string,
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        password_confirmation: string) => {

        const response = await apiBase.post("users/sign_up/", {
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
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