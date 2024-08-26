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

    list: async (page: number, itemsPerPage: number) => {
        const response = await apiBase.get(`users/?page=${page}&limit=${itemsPerPage}`);
        if (response.status == 200) {
            return await response.data;
        }
    },

    get: async (userId: string) => {
        const response = await apiBase.get(`users/${userId}`);
        if (response.status == 200) {
            return await response.data;
        }
    },

    update: async (new_data: UserUpdate, userId: string) => {
        try {
            const response = await apiBase.put(`users/${userId}`, new_data);
            
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
        const response = await apiBase.delete(`users/${userId}`);
        if (response.status == 200) {
            return await response.data;
        }
    },

    acceptInvite: async (userId: string, companyId: string) => {
        return await apiBase.post(`users/${userId}/invites/${companyId}`);
    },

    rejectInvite: async (userId: string, companyId: string) => {
        return await apiBase.delete(`users/${userId}/invites/${companyId}`);
    },

    getInvites: async (userId: string) => {
        return await apiBase.get(`users/${userId}/invites/`);   
    },

    requestToJoin: async (userId: string, companyId: string) => {
        return await apiBase.post(`users/${userId}/requests/${companyId}`);
    },

    cancelRequest: async (userId: string, companyId: string) => {
        return await apiBase.delete(`users/${userId}/requests/${companyId}`);
    },

    getRequests: async (userId: string) => {
        return await apiBase.get(`users/${userId}/requests`);
    },

    getLastestQuizzCompletions: async (userId: string) => {
        return await apiBase.get(`/users/${userId}/quizzes/latest/`);
    }

}