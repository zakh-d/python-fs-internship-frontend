import { QuizzCreate } from "../Types/QuizzTypes";
import apiBase from "./api-configuration";

const quizzApi = {
    createQuizz: async (quizz: QuizzCreate, companyId: string) => {
        return await apiBase.post('/quizzes/', {...quizz, company_id: companyId});
    }
}

export default quizzApi;