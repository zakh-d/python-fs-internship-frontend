import { createSlice } from "@reduxjs/toolkit";
import { QuizzCreate } from "../Types/QuizzTypes";
import { toast } from "react-toastify";

type StateType = {
    quizzBeingCreated: QuizzCreate;
}

const initialState: StateType = {
    quizzBeingCreated: {
        title: '',
        description: '',
        frequency: 0,
        questions: [
            {
                text: "",
                answers: [
                    {
                        text: "",
                        is_correct: true
                    },
                    {
                        text: "",
                        is_correct: false
                    }
                ]
            }
        ],
    }
}

const quizzSlice = createSlice({
    name: "quizz",
    initialState,
    reducers: {
        addEmptyQuestion: (state) => {
            state.quizzBeingCreated.questions.push({text: '', answers: [
                {
                    text: '',
                    is_correct: true
                },
                {
                    text: '',
                    is_correct: false
                }
            ]});
        },
        addEmptyAnswer: (state, action: {payload: {questionIndex: number}}) => {
            if (!state.quizzBeingCreated.questions[action.payload.questionIndex].answers) {
                state.quizzBeingCreated.questions[action.payload.questionIndex].answers = [];
            }
            if (state.quizzBeingCreated.questions[action.payload.questionIndex].answers.length >= 4) {
                return;
            }
            state.quizzBeingCreated.questions[action.payload.questionIndex].answers.push({text: '', is_correct: false});
        },
        removeQuestion: (state, action: {payload: number}) => {
            if (state.quizzBeingCreated.questions.length <= 1) {
                return;
            }
            state.quizzBeingCreated.questions.splice(action.payload, 1);
        },
        removeAnswer: (state, action: {payload: {questionIndex: number, answerIndex: number}}) => {
            
            if (state.quizzBeingCreated.questions[action.payload.questionIndex].answers.length <= 2) {
                return;
            }

            if (state.quizzBeingCreated.questions[action.payload.questionIndex].answers.filter(answer => answer.is_correct).length === 1
                && state.quizzBeingCreated.questions[action.payload.questionIndex].answers[action.payload.answerIndex].is_correct) {
                toast.error('Cannot remove the only correct answer');
                return;
            }
            state.quizzBeingCreated.questions[action.payload.questionIndex].answers.splice(action.payload.answerIndex, 1);
        },
        setQuizzTitle: (state, action: {payload: string}) => {
            state.quizzBeingCreated.title = action.payload;
        },
        setQuizzDescription: (state, action: {payload: string}) => {
            state.quizzBeingCreated.description = action.payload;
        },
        setQuizzFrequency: (state, action: {payload: number}) => {
            state.quizzBeingCreated.frequency = action.payload;
        },
        setQuestionText: (state, action: {payload: {questionIndex: number, text: string}}) => {
            state.quizzBeingCreated.questions[action.payload.questionIndex].text = action.payload.text;
        },
        setAnswerText: (state, action: {payload: {questionIndex: number, answerIndex: number, text: string}}) => {
            state.quizzBeingCreated.questions[action.payload.questionIndex].answers[action.payload.answerIndex].text = action.payload.text;
        },
        setAnswerCorrect: (state, action: {payload: {questionIndex: number, answerIndex: number, isCorrect: boolean}}) => {
            if (
                !action.payload.isCorrect 
                && state.quizzBeingCreated.questions[action.payload.questionIndex].answers.filter(answer => answer.is_correct).length === 1
            ) return;
            state.quizzBeingCreated.questions[action.payload.questionIndex].answers[action.payload.answerIndex].is_correct = action.payload.isCorrect;
        },
    },
});

export const { 
    addEmptyQuestion,
    addEmptyAnswer,
    setAnswerCorrect,
    setAnswerText,
    setQuestionText,
    setQuizzDescription,
    setQuizzFrequency,
    setQuizzTitle,
    removeAnswer,
    removeQuestion
} = quizzSlice.actions;
export default quizzSlice.reducer;
