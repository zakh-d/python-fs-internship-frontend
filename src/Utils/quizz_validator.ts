import { QuestionCreate, QuizzCreate } from "../Types/QuizzTypes";

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
    let questionError = null;
    quizz.questions.forEach((question) => {
        const error = validateQuestion(question);
        if (error) {
            questionError = error;
        }
    });

    return questionError;
}

export const validateQuestion = (question: QuestionCreate): string | null => {
    if (!question.text) {
        return 'Question text is required';
    }
    if (question.answers.length < 2) {
        return 'Question must have at least 2 answers';
    }
    if (question.answers.length > 4) {
        return 'Question must have at most 4 answers';
    }
    if (question.answers.filter((answer) => answer.is_correct).length < 1) {
        return 'Question must have at least 1 correct answer';
    }
    return null;
}