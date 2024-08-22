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

export type QuizzUpdateType = {
    title: string;
    description: string;
    frequency: number;
}

export type Answer = {
    id: string;
    text: string;
}

export interface AnswerWithIsCorrect extends Answer {
    is_correct: boolean;
}

export type Question<T extends Answer> = {
    id: string;
    text: string;
    answers: T[];
}

export type QuizzWithoutQuestions = {
    id: string;
    title: string;
    description: string;
    frequency: number;
}

export interface QuizzForAdminOwner extends QuizzWithoutQuestions {
    questions: Question<AnswerWithIsCorrect>[];
}


export interface Quizz extends QuizzWithoutQuestions {
    questions: Question<Answer>[];
}

export type QuizzResponse = {
    quizz_id: string;
    questions: 
    {
            question_id: string;
            answer_ids: string[]
        }[]
    
}
