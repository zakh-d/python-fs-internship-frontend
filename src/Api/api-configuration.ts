import axios, { AxiosInstance } from "axios";
import { API_HOST } from "../Config/config";

const apiBase: AxiosInstance = axios.create({
    baseURL: 'http://' + API_HOST + '/',
});

apiBase.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default apiBase;