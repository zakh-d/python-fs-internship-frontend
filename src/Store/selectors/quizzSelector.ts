import { RootState } from "../store";

export const selectQuizzBeingCreated = (state: RootState) => state.quizz.quizzBeingCreated;