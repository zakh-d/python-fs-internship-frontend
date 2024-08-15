import { QuizzCreate } from "../Types/QuizzTypes";

export const quizzCreateValidator = (quizz: QuizzCreate): string | null => {
    if (!quizz.title) {
        return 'Title is required';
    }
    if (!quizz.description) {
        return 'Description is required';
    }
    if (!quizz.frequency) {
        return 'Frequency is required';
    }
    if (quizz.questions.length === 0) {
        return 'Questions are required';
    }

    if (quizz.questions.filter((question) => question.answers.length < 2)) {
        return 'Questions must have at least 2 answers';
    }

    if (quizz.questions.filter((question) => question.answers.length > 4)) {
        return 'Questions must have at most 4 answers';
    }

    if (quizz.questions.filter((question) => question.answers.filter((answer) => answer.is_correct).length < 1)) {
        return 'Questions must have exactly at least correct answer';
    }

    return null;
}