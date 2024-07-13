import apiBase from "./api-configuration";

export const healthApi = {
  getHealth: async () => {
    const response = await apiBase.get("health");
    return response.data;
  },
};