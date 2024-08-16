import { RootState } from "../store";

export const selectQuizzBeingCreated = (state: RootState) => state.quizz.quizzBeingCreated;
export const selectQuizzList = (state: RootState) => state.quizz.quizzList;
export const selectQuizzTotalCount = (state: RootState) => state.quizz.quizzTotalCount;