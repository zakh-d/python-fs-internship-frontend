import apiBase from "./api-configuration"

const notificationApi = {
    getNotifications: async() => {
        return await apiBase.get("/notifications/");
    },
    markAsRead: async (id: string) => {
        return await apiBase.put(`/notifications/${id}/`);
    }
}

export default notificationApi;