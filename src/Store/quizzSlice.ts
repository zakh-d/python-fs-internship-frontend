import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AnswerCreate, QuestionCreate, Quizz, QuizzCreate, QuizzWithoutQuestions } from "../Types/QuizzTypes";
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
    quizzBeingEdited: Quizz | null;
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
    quizzTotalCount: 0,
    quizzBeingEdited: null,
}


export const fetchCreateQuizz = createAsyncThunk<
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

export const fetchQuizzWithCorrectAnswers = createAsyncThunk<
Quizz,
string,
{
    rejectValue: string
}
>('quizz/getQuizz', async (quizzId: string, {rejectWithValue}) => {
    try {
        const response = await quizzApi.getQuizzWithCorrectAnswers(quizzId);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            e.response?.data.detail && toast.error(e.response.data.detail);
            return rejectWithValue('Error getting quizz');
        }
        return rejectWithValue('Error getting quizz');
    }
});

export const fetchCompanyQuizzes = createAsyncThunk<
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

export const fetchUpdateQuestion = createAsyncThunk<
Quizz,
{
    quizzId: string,
    questionId: string,
    text: string
},
{
    rejectValue: string
}>('quizz/updateQuestion', async ({quizzId, questionId, text}, {rejectWithValue}) => {
    try {
        const response = await quizzApi.updateQuestion(quizzId, questionId, text);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            e.response?.data.detail && toast.error(e.response.data.detail);
            return rejectWithValue('Error updating question');
        }
        return rejectWithValue('Error updating question');
    }
});

export const fetchDeleteQuestion = createAsyncThunk<
Quizz,
{
    quizzId: string,
    questionId: string
},
{
    rejectValue: string
}>('quizz/deleteQuestion', async ({quizzId, questionId}, {rejectWithValue}) => {
    try {
        const response = await quizzApi.deleteQuestion(quizzId, questionId);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            e.response?.data.detail && toast.error(e.response.data.detail);
            return rejectWithValue('Error deleting question');
        }
        return rejectWithValue('Error deleting question');
    }
});

export const fetchUpdateAnswer = createAsyncThunk<
Quizz,
AnswerCreate & {
    quizzId: string,
    answerId: string
},
{
    rejectValue: string
}>('quizz/updateAnswer', async ({quizzId, answerId, text, is_correct}, {rejectWithValue}) => {
    try {
        const response = await quizzApi.updateAnswer(quizzId, answerId, {text, is_correct});
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            e.response?.data.detail && toast.error(e.response.data.detail);
            return rejectWithValue('Error updating answer');
        }
        return rejectWithValue('Error updating answer');
    }
});

export const fetchDeleteAnswer = createAsyncThunk<
Quizz,
{
    quizzId: string,
    answerId: string
},
{
    rejectValue: string
}>('quizz/deleteAnswer', async ({quizzId, answerId}, {rejectWithValue}) => {
    try {
        const response = await quizzApi.deleteAnswer(quizzId,  answerId);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            e.response?.data.detail && toast.error(e.response.data.detail);
            return rejectWithValue('Error deleting answer');
        }
        return rejectWithValue('Error deleting answer');
    }
});

export const fetchAddAnswer = createAsyncThunk<
Quizz,
{
    quizzId: string,
    questionId: string,
    answerData: AnswerCreate
},
{
    rejectValue: string
}>('quizz/addAnswer', async ({quizzId, questionId, answerData}, {rejectWithValue}) => {
    try {
        const response = await quizzApi.addAnswerToQuestion(quizzId, questionId, answerData);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            e.response?.data.detail && toast.error(e.response.data.detail);
            return rejectWithValue('Error adding answer');
        }
        return rejectWithValue('Error adding answer');
    }
});

export const fetchAddQuestion = createAsyncThunk<
Quizz,
{
    quizzId: string,
    questionData: QuestionCreate
},
{
    rejectValue: string
}>('quizz/addQuestion', async ({quizzId, questionData}, {rejectWithValue}) => {
    try {
        const response = await quizzApi.addQuestionToQuizz(quizzId, questionData);
        return response.data;
    } catch (e) {
        if (e instanceof AxiosError) {
            e.response?.data.detail && toast.error(e.response.data.detail);
            return rejectWithValue('Error adding question');
        }
        return rejectWithValue('Error adding question');
    }
});

export const fetchDeleteQuizz = createAsyncThunk<
{
    quizzId: string
},
{
    quizzId: string
},
{
    rejectValue: string
}>('quizz/deleteQuizz', async ({quizzId}, {rejectWithValue, dispatch}) => {
    dispatch(pageStartedLoading());
    try {
        await quizzApi.deleteQuizz(quizzId);
        dispatch(pageFinishedLoading());
        return {quizzId};
    } catch (e) {
        dispatch(pageFinishedLoading());
        if (e instanceof AxiosError) {
            e.response?.data.detail && toast.error(e.response.data.detail);
            return rejectWithValue('Error deleting quizz');
        }
        return rejectWithValue('Error deleting quizz');
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
        clearCurrentQuizz: (state) => {
            state.quizzBeingEdited = null;
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
        setEditingQuizzTitle: (state, action: {payload: string}) => {
            if (!state.quizzBeingEdited) return;
            state.quizzBeingEdited.title = action.payload;
        },
        setEditingQuizzDescription: (state, action: {payload: string}) => {
            if (!state.quizzBeingEdited) return;
            state.quizzBeingEdited.description = action.payload;
        },
        setEditingQuizzFrequency: (state, action: {payload: number}) => {
            if (!state.quizzBeingEdited) return;
            state.quizzBeingEdited.frequency = action.payload;
        },
        setEditingQuestionText: (state, action: {payload: {questionIndex: number, text: string}}) => {
            if (!state.quizzBeingEdited) return;
            state.quizzBeingEdited.questions[action.payload.questionIndex].text = action.payload.text;
        },
        setEditingAnswerText: (state, action: {payload: {questionIndex: number, answerIndex: number, text: string}}) => {
            if (!state.quizzBeingEdited) return;
            state.quizzBeingEdited.questions[action.payload.questionIndex].answers[action.payload.answerIndex].text = action.payload.text;
        },
        setEditingAnswerCorrect: (state, action: {payload: {questionIndex: number, answerIndex: number, isCorrect: boolean}}) => {
            if (!state.quizzBeingEdited) return;
            if (
                !action.payload.isCorrect 
                && state.quizzBeingEdited.questions[action.payload.questionIndex].answers.filter(answer => answer.is_correct).length === 1
            ) return;
            state.quizzBeingEdited.questions[action.payload.questionIndex].answers[action.payload.answerIndex].is_correct = action.payload.isCorrect;
        },
        addEditingEmptyAnswer: (state, action: {payload: {questionIndex: number}}) => {
            if (!state.quizzBeingEdited) return;
            if (state.quizzBeingEdited?.questions[action.payload.questionIndex].answers.length >= 4) {
                return;
            }
            state.quizzBeingEdited?.questions[action.payload.questionIndex].answers.push({id: '', text: '', is_correct: false});
        },
        removeEditingAnswer: (state, action: {payload: {questionIndex: number, answerIndex: number}}) => {
            if (!state.quizzBeingEdited) return;
            if (state.quizzBeingEdited.questions[action.payload.questionIndex].answers.length <= 2) {
                return;
            }

            if (state.quizzBeingEdited.questions[action.payload.questionIndex].answers.filter(answer => answer.is_correct).length === 1
                && state.quizzBeingEdited.questions[action.payload.questionIndex].answers[action.payload.answerIndex].is_correct) {
                toast.error('Cannot remove the only correct answer');
                return;
            }
            state.quizzBeingEdited.questions[action.payload.questionIndex].answers.splice(action.payload.answerIndex, 1);
        },
        addNewQuestion: (state) => {
            state.quizzBeingEdited?.questions.push({
                text: '',
                answers: [
                    {
                        text: '',
                        is_correct: true,
                        id: "new_answer"
                    },
                    {
                        text: '',
                        is_correct: false,
                        id: "new_answer"
                    }
                ],
                id: "new_question"
            });
        },
        removeUnsavedQuestion: (state) => {
            if (!state.quizzBeingEdited) return;

            state.quizzBeingEdited.questions = state.quizzBeingEdited.questions.filter(question => question.id !== 'new_question');
        }
    },
    extraReducers: builder => {

        builder.addCase(fetchCompanyQuizzes.fulfilled, (state, action) => {
            state.quizzList = action.payload.quizzes;
            state.quizzTotalCount = action.payload.total_count;
        });

        builder.addCase(fetchQuizzWithCorrectAnswers.fulfilled, (state, action) => {
            state.quizzBeingEdited = action.payload;
        });

        builder.addCase(fetchUpdateQuestion.fulfilled, (state, action) => {
            state.quizzBeingEdited = action.payload;
        });

        builder.addCase(fetchUpdateAnswer.fulfilled, (state, action) => {
            state.quizzBeingEdited = action.payload;
        });

        builder.addCase(fetchDeleteQuestion.fulfilled, (state, action) => {
            state.quizzBeingEdited = action.payload;
        });

        builder.addCase(fetchAddAnswer.fulfilled, (state, action) => {
            state.quizzBeingEdited = action.payload;
        });

        builder.addCase(fetchDeleteAnswer.fulfilled, (state, action) => {
            state.quizzBeingEdited = action.payload;
        });

        builder.addCase(fetchAddQuestion.fulfilled, (state, action) => {
            state.quizzBeingEdited = action.payload;
        });

        builder.addCase(fetchDeleteQuizz.fulfilled, (state, action) => {
            state.quizzList = state.quizzList.filter(quizz => quizz.id !== action.payload.quizzId);
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
    clearQuizzForm,
    clearCurrentQuizz,
    setEditingAnswerText,
    setEditingAnswerCorrect,
    setEditingQuizzDescription,
    setEditingQuizzFrequency,
    setEditingQuizzTitle,
    setEditingQuestionText,
    addNewQuestion,
    addEditingEmptyAnswer,
    removeEditingAnswer,
    removeUnsavedQuestion
} = quizzSlice.actions;
export default quizzSlice.reducer;
