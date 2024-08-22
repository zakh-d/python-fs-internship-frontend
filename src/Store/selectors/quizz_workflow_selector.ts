import { RootState } from "../store";

export const selectCurrentQuestion = (state: RootState) => state.quizzWorkflow.quizzToPass?.questions[state.quizzWorkflow.currentQuestionIndex];
export const selectCurrentQuestionAnswers = (state: RootState) => {
    const currentQuestionIndex = state.quizzWorkflow.currentQuestionIndex;
    return state.quizzWorkflow.quizzResponse?.questions[currentQuestionIndex].answer_ids || [];
}