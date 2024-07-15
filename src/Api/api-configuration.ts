import axios, { AxiosInstance } from "axios";
import { API_HOST } from "../Config/config";

const apiBase: AxiosInstance = axios.create({
    baseURL: 'http://' + API_HOST + '/',
});

export default apiBase;