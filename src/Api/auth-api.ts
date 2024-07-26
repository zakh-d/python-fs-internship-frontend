import apiBase from "./api-configuration";

export const authApi = {
    async login(email: string, password: string) {
        const response = await apiBase.post("users/sign_in", {
            email: email,
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
    },

    async me (token: string) {
        const response = await apiBase.get("/users/me/", {
            headers: {
                Authorization: `Bearer ${token}`
            }
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