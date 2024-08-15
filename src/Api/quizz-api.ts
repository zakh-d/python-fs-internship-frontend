import { QuizzCreate } from "../Types/QuizzTypes";
import apiBase from "./api-configuration";

const quizzApi = {
    createQuizz: async (quizz: QuizzCreate) => {
        return await apiBase.post('/quizz', quizz);
    }
}

export default quizzApi;