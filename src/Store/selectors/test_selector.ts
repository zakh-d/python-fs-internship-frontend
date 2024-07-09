import store from "../store";

type RootState = ReturnType<typeof store.getState>;

export function selectTestString(state: RootState) {
    return state.test.testString;
}