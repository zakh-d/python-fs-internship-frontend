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
    updateCompany: async (id: string, values: {name: string, description: string, hidden: boolean}) => {
        return await apiBase.put(`/companies/${id}`, values);
    },

    deleteComapny: async (id: string) => {
        return await apiBase.delete(`/companies/${id}`);
    },

    createCompany: async (values: {name: string, description: string, hidden: boolean}) => {
        return await apiBase.post(`/companies`, values);
    }
}

export default companyApi;