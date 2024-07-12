import axios from "axios";
import { API_HOST } from "../Config/config";

export const healthApi = {
  getHealth: async () => {
    const response = await axios.get("http://" + API_HOST + "/health");
    return response.data;
  },
};