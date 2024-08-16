import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Quizz, QuizzCreate, QuizzWithoutQuestions } from "../Types/QuizzTypes";
import { toast } from "react-toastify";
import quizzApi from "../Api/quizz-api";
import { selectQuizzBeingCreated } from "./selectors/quizzSelector";
import { RootState } from "./store";
import { AxiosError } from "axios";
import { customNavigator } from "../Utils/_helper";
import { getCompanyQuizzPath } from "../Utils/router";
import { pageFinishedLoading, pageStartedLoading } from "./pageSlice";

type StateType = {
    quizzBeingCreated: QuizzCreate;
    quizzList: QuizzWithoutQuestions[];
    quizzTotalCount: number;
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
    },
    quizzList: [],
    quizzTotalCount: 0
}


export const createQuizz = createAsyncThunk<
void,
string,
{
    rejectValue: string
}
>('quizz/createQuizz', async (companyId: string, {rejectWithValue, getState, dispatch}) => {
    dispatch(pageStartedLoading());
    try {
        const quizz = selectQuizzBeingCreated(getState() as RootState);
        await quizzApi.createQuizz(quizz, companyId);
        dispatch(pageFinishedLoading());
        customNavigator.navigate?.(getCompanyQuizzPath(companyId));
    } catch (e) {
        dispatch(pageFinishedLoading());
        if (e instanceof AxiosError) {
            e.response?.data.detail && toast.error(e.response.data.detail);
            return rejectWithValue('Error creating quizz');
        }
        return rejectWithValue('Error creating quizz');
    }
});

export const getQuizz = createAsyncThunk<
Quizz,
string,
{
    rejectValue: string
}
>('quizz/getQuizz', async (quizzId: string, {rejectWithValue}) => {
    try {
        const response = await quizzApi.getQuizz(quizzId);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            e.response?.data.detail && toast.error(e.response.data.detail);
            return rejectWithValue('Error getting quizz');
        }
        return rejectWithValue('Error getting quizz');
    }
});

export const getCompanyQuizzes = createAsyncThunk<
{quizzes: Quizz[],
total_count: number
},
{
    companyId: string,
    page: number,
    itemsPerPage: number
},
{
    rejectValue: string
}>('quizz/getCompanyQuizzes', async ({companyId, page, itemsPerPage}, {rejectWithValue, dispatch}) => {
    dispatch(pageStartedLoading());
    try {
        const response = await quizzApi.getCompanyQuizzes(companyId, itemsPerPage, page);
        dispatch(pageFinishedLoading());
        return response.data;
    } catch (e) {
        dispatch(pageFinishedLoading());
        if (e instanceof AxiosError) {
            e.response?.data.detail && toast.error(e.response.data.detail);
            return rejectWithValue('Error getting quizzes');
        }
        return rejectWithValue('Error getting quizzes');
    }
});

const quizzSlice = createSlice({
    name: "quizz",
    initialState,
    reducers: {
        clearQuizzForm: (state) => {
            state.quizzBeingCreated = {
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
            };
        },
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
    extraReducers: builder => {
        builder.addCase(getCompanyQuizzes.fulfilled, (state, action) => {
            state.quizzList = action.payload.quizzes;
            state.quizzTotalCount = action.payload.total_count;
        });
    }
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
    removeQuestion,
    clearQuizzForm
} = quizzSlice.actions;
export default quizzSlice.reducer;
