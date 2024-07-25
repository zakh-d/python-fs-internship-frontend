import { AxiosError } from "axios";
import ServerValidationError from "../Types/ServerValidationError";
import SignUpSchema from "../Types/SignUpSchema";
import { UserUpdate } from "../Types/UserType";
import apiBase from "./api-configuration";

interface HasMessage {
    msg: string;
}

export const userApi = {
    signUp: async (signUpSchema: SignUpSchema) => {

        const response = await apiBase.post("users/", {
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
    },

    list: async () => {
        const response = await apiBase.get("users/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (response.status == 200) {
            return await response.data;
        }
    },

    get: async (userId: string) => {
        const response = await apiBase.get(`users/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (response.status == 200) {
            return await response.data;
        }
    },

    update: async (new_data: UserUpdate, userId: string) => {
        try {
            const response = await apiBase.put(`users/${userId}`, new_data, {headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }});
            
            return await response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    if (error.response.status === 401) {
                        throw new ServerValidationError([error.response.data.detail]);
                    } else if (error.response.status === 422) {
                        const errors = error.response.data.detail.map((d: HasMessage) => d.msg);
                        throw new ServerValidationError(errors);
                    }
                }
            }
        }
    },

    delete: async (userId: string) => {
        const response = await apiBase.delete(`users/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (response.status == 200) {
            return await response.data;
        }
    }

}