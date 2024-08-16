import { QuizzCreate } from "../Types/QuizzTypes";
import apiBase from "./api-configuration";

const quizzApi = {
    createQuizz: async (quizz: QuizzCreate, companyId: string) => {
        return await apiBase.post('/quizzes/', {...quizz, company_id: companyId});
    },
    getQuizz: async (quizzId: string) => {
        return await apiBase.get(`/quizzes/${quizzId}/`);
    },
    getCompanyQuizzes: async (companyId: string, itemsPerPage: number, page: number) => {
        return await apiBase.get(`/companies/${companyId}/quizzes/?page=${page}&limit=${itemsPerPage}`);
    }
}

export default quizzApi;