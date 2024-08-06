import apiBase from "./api-configuration";

const companyApi = {
    getComanies: async (page: number, limit: number) => {
        return await apiBase.get(`/companies?page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
}

export default companyApi;