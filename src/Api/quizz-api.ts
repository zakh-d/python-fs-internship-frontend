import { AnswerCreate, QuestionCreate, QuizzCreate, QuizzResponse, QuizzUpdateType } from "../Types/QuizzTypes";
import apiBase from "./api-configuration";

const quizzApi = {
    createQuizz: async (quizz: QuizzCreate, companyId: string) => {
        return await apiBase.post('/quizzes/', {...quizz, company_id: companyId});
    },
    getQuizz: async (quizzId: string) => {
        return await apiBase.get(`/quizzes/${quizzId}/`);
    },
    getQuizzWithCorrectAnswers: async (quizzId: string) => {
        return await apiBase.get(`/quizzes/${quizzId}/correct/`);
    },
    getCompanyQuizzes: async (companyId: string, itemsPerPage: number, page: number) => {
        return await apiBase.get(`/companies/${companyId}/quizzes/?page=${page}&limit=${itemsPerPage}`);
    },
    updateQuizz: async (quizzId: string, data: QuizzUpdateType) => {
        return await apiBase.put(`/quizzes/${quizzId}/`, data);
    },
    updateQuestion: async (quizzId: string, questionId: string, text: string) => {
        return await apiBase.put(`/quizzes/${quizzId}/question/${questionId}/`, {text});
    },
    updateAnswer: async (quizzId: string, answerId: string, answerData: AnswerCreate) => {
        return await apiBase.put(`/quizzes/${quizzId}/answer/${answerId}/`, answerData);
    },
    addAnswerToQuestion: async (quizzId: string, questionId: string, answerData: AnswerCreate) => {
        return await apiBase.post(`/quizzes/${quizzId}/question/${questionId}/answer/`, answerData);
    },
    addQuestionToQuizz: async (quizzId: string, question: QuestionCreate) => {
        return await apiBase.post(`/quizzes/${quizzId}/question/`, question);
    },
    deleteQuizz: async (quizzId: string) => {
        return await apiBase.delete(`/quizzes/${quizzId}/`);
    },
    deleteQuestion: async (quizzId: string, questionId: string) => {
        return await apiBase.delete(`/quizzes/${quizzId}/question/${questionId}/`);
    },
    deleteAnswer: async (quizzId: string, answerId: string) => {
        return await apiBase.delete(`/quizzes/${quizzId}/answer/${answerId}/`);
    },
    completeQuizz: async (data: QuizzResponse) => {
        return await apiBase.post(`/quizzes/complete/`, data);
    }
}

export default quizzApi;