import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Quizz, QuizzResponse } from "../Types/QuizzTypes";
import quizzApi from "../Api/quizz-api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";


type StateType = {
    currentQuestionIndex: number,
    quizzToPass: Quizz | null,
    quizzResponse: QuizzResponse | null,
    status: 'not_started' | 'in_progress' | 'finished',
    score?: number
}

const initialState: StateType = {
    currentQuestionIndex: 0,
    quizzToPass: null,
    quizzResponse: null,
    status: 'not_started'
}

export const fetchQuizzToPass = createAsyncThunk<
Quizz,
{
    quizzId: string
},
{
    rejectValue: string
}
>(
    'quizzWorkflow/fetchQuizzToPass',
    async ({quizzId}) => {
        try {
            const response = await quizzApi.getQuizz(quizzId);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                
            }
        }
    }
);

export const fetchCompleteQuizz = createAsyncThunk<
{
    score: number
},
{
    data: QuizzResponse
},
{
    rejectValue: string
}>(
    'quizzWorkflow/fetchCompleteQuizz',
    async ({data}) => {
        try {
            const response = await quizzApi.completeQuizz(data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                error.response?.data.detail && toast.error(error.response.data.detail);
            }
        }
    }
);

const quizzWorkflowSlice = createSlice({
    name: "quizzWorkflow",
    initialState: initialState,
    reducers: {
        nextQuestion: (state) => {
            if (state.quizzToPass && state.quizzResponse) {
                state.currentQuestionIndex++;
                if (state.currentQuestionIndex >= state.quizzToPass.questions.length) {
                    state.status = 'finished';
                }
            }
        },
        checkAnswer: (state, action: {payload: string}) => {
            if (!state.quizzResponse || !state.quizzToPass) {
                return;
            }
            if (state.quizzResponse.questions.length <= state.currentQuestionIndex) {
                state.quizzResponse.questions.push({
                    question_id: state.quizzToPass.questions[state.currentQuestionIndex].id,
                    answer_ids: [action.payload]
                });
            } else {
                state.quizzResponse.questions[state.currentQuestionIndex].answer_ids.push(action.payload);
            }
        },
        uncheckAnswer: (state, action: {payload: string}) => {
            if (!state.quizzResponse || !state.quizzToPass) {
                return;
            }
            if (state.quizzResponse.questions.length <= state.currentQuestionIndex) {
                return;
            }
            state.quizzResponse.questions[state.currentQuestionIndex].answer_ids = state.quizzResponse.questions[state.currentQuestionIndex].answer_ids.filter(id => id !== action.payload);
        },
        uncheckAllAnswers: (state) => {
            if (!state.quizzResponse || !state.quizzToPass) {
                return;
            }
            if (state.quizzResponse.questions.length <= state.currentQuestionIndex) {
                return;
            }
            state.quizzResponse.questions[state.currentQuestionIndex].answer_ids = [];
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchQuizzToPass.fulfilled, (state, action) => {
            state.quizzToPass = action.payload;
            state.quizzResponse = {
                quizz_id: action.payload.id,
                questions: []
            }
            state.status = 'in_progress';
        });

        builder.addCase(fetchQuizzToPass.rejected, (state) => {
            state.status = 'not_started';
        });

        builder.addCase(fetchCompleteQuizz.fulfilled, (state, action) => {
            state.status = 'finished';
            state.score = action.payload.score;
            state.quizzToPass = null;
            state.quizzResponse = null;
            state.currentQuestionIndex = 0;
        });
    }
});

export const {
    nextQuestion,
    checkAnswer,
    uncheckAnswer,
    uncheckAllAnswers
} = quizzWorkflowSlice.actions;
export default quizzWorkflowSlice.reducer;