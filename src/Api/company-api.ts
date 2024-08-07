import apiBase from "./api-configuration";

const companyApi = {
    getComanies: async (page: number, limit: number) => {
        return await apiBase.get(`/companies?page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    getMyCompanies: async (page: number, limit: number) => {
        return await apiBase.get(`/companies/my/?page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    getCompanyById: async (id: string) => {
        return await apiBase.get(`/companies/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    updateCompany: async (id: string, values: {name: string, description: string, hidden: boolean}) => {
        return await apiBase.put(`/companies/${id}`, values, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },

    deleteComapny: async (id: string) => {
        return await apiBase.delete(`/companies/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },

    createCompany: async (values: {name: string, description: string, hidden: boolean}) => {
        return await apiBase.post(`/companies`, values, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
}

export default companyApi;