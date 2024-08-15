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