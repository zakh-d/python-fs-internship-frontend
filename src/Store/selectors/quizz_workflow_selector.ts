import { RootState } from "../store";

export const selectCurrentQuestion = (state: RootState) => state.quizzWorkflow.quizzToPass?.questions[state.quizzWorkflow.currentQuestionIndex];
export const selectCurrentQuestionAnswers = (state: RootState) => {
    const currentQuestionIndex = state.quizzWorkflow.currentQuestionIndex;
    return state.quizzWorkflow.quizzResponse?.questions[currentQuestionIndex]?.answer_ids || [];
}
export const selectQuizzWorkflowStatus = (state: RootState) => state.quizzWorkflow.status;
export const selectIsLastQuestion = (state: RootState) => {
    const quizz = state.quizzWorkflow.quizzToPass;
    if (!quizz) return false;
    const currentQuestionIndex = state.quizzWorkflow.currentQuestionIndex;
    const lastQuestionIndex = quizz.questions.length - 1;
    return currentQuestionIndex === lastQuestionIndex;
}