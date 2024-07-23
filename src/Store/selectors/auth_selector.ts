import store from "../store";

type RootState = ReturnType<typeof store.getState>;

export function selectIsAuthenticated(state: RootState): boolean {
    return state.auth.isAuthenticated;
}

export function selectMe(state: RootState) {
    return state.auth.me;
}

export function selectLoginStatus(state: RootState) {
    return state.auth.loginStatus;
}

export function selectFetchingMe(state: RootState) {
    return state.auth.fetchingMe;
}