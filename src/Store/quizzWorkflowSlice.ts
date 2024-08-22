import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Quizz, QuizzResponse } from "../Types/QuizzTypes";
import quizzApi from "../Api/quizz-api";
import { AxiosError } from "axios";


type StateType = {
    currentQuestionIndex: number,
    quizzToPass: Quizz | null,
    quizzResponse: QuizzResponse | null,
    status: 'not_started' | 'in_progress' | 'finished'
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
    }
});

export const {
    nextQuestion,
    checkAnswer,
    uncheckAnswer
} = quizzWorkflowSlice.actions;
export default quizzWorkflowSlice.reducer;