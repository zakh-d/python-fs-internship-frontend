import apiBase from "./api-configuration";

export const authApi = {
    async login(username: string, password: string) {
        const response = await apiBase.post("auth/sign_in", {
            username: username,
            password: password
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
};