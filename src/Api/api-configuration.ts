import axios, { AxiosInstance } from "axios";
import { API_HOST } from "../Config/config";
import store from "../Store/store";
import { eraseAuthInfo } from "../Store/authSlice";

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

apiBase.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            store.dispatch(eraseAuthInfo());
        }
        return Promise.reject(error);
    }
);

export default apiBase;