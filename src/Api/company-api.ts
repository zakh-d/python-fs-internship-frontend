import apiBase from "./api-configuration";

const companyApi = {
    getComanies: async (page: number, limit: number) => {
        return await apiBase.get(`/companies?page=${page}&limit=${limit}`);
    },
    getMyCompanies: async (page: number, limit: number) => {
        return await apiBase.get(`/companies/my/?page=${page}&limit=${limit}`);
    },
    getCompanyById: async (id: string) => {
        return await apiBase.get(`/companies/${id}`);
    },
    getMyRoleInCompany: async (id: string) => {
        return await apiBase.get(`/companies/${id}/role/`);
    },
    updateCompany: async (id: string, values: {name: string, description: string, hidden: boolean}) => {
        return await apiBase.put(`/companies/${id}`, values);
    },

    deleteComapny: async (id: string) => {
        return await apiBase.delete(`/companies/${id}`);
    },

    createCompany: async (values: {name: string, description: string, hidden: boolean}) => {
        return await apiBase.post(`/companies`, values);
    },

    getCompanyMembers: async (id: string) => {
        return await apiBase.get(`/companies/${id}/members`);
    },

    removeCompanyMember: async (companyId: string, userId: string) => {
        return await apiBase.delete(`/companies/${companyId}/members/${userId}`);
    },

    getCompanyInvites: async (id: string) => {
        return await apiBase.get(`/companies/${id}/invites`);
    },

    cancelUserInvite: async (companyId: string, userId: string) => {
        return await apiBase.delete(`/companies/${companyId}/invites/${userId}`);
    },

    inviteUser: async (companyId: string, userEmail: string) => {
        return await apiBase.post(`/companies/${companyId}/invites/`, {
            email: userEmail
        });
    },

    getCompanyRequests: async (id: string) => {
        return await apiBase.get(`/companies/${id}/requests`);
    },

    acceptUserRequest: async (companyId: string, userId: string) => {
        return await apiBase.post(`/companies/${companyId}/requests/${userId}`);
    },

    rejectUserRequest: async (companyId: string, userId: string) => {
        return await apiBase.delete(`/companies/${companyId}/requests/${userId}`);
    },

    getAdminList: async (companyId: string) => {
        return await apiBase.get(`/companies/${companyId}/admins`);
    },

    addAdmin: async (companyId: string, userId: string) => {
        return await apiBase.post(`/companies/${companyId}/admins/`, {user_id: userId});
    },

    removeAdmin: async (companyId: string, userId: string) => {
        return await apiBase.delete(`/companies/${companyId}/admins/${userId}`);
    },

    membersAverageScoresAnalytics: async (companyId: string) => {
        return await apiBase.get(`/companies/${companyId}/quizzes/average/members/?interval=days`);
    }
}

export default companyApi;