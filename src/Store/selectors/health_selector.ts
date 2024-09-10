import HealthInfo from "../../Types/HealthInfo";
import store from "../store";

type RootState = ReturnType<typeof store.getState>;

export function selectAppHealth(state: RootState): HealthInfo {
    return state.health.app;
}

export function selectRedisHealth(state: RootState): HealthInfo {
    return state.health.redis;
}

export function selectDbHealth(state: RootState): HealthInfo {
    return state.health.db;
}
