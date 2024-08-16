export type AnswerCreate = {
    text: string;
    is_correct: boolean;
}

export type QuestionCreate = {
    text: string;
    answers: AnswerCreate[];
}

export type QuizzCreate = {
    title: string;
    description: string;
    frequency: number;
    questions: QuestionCreate[];
}

export type Answer = {
    id: string;
    text: string;
    is_correct: boolean;
}

export type Question = {
    id: string;
    text: string;
    answers: Answer[];
}

export type QuizzWithoutQuestions = {
    id: string;
    title: string;
    description: string;
    frequency: number;
}

export interface Quizz extends QuizzWithoutQuestions {
    questions: Question[];
}