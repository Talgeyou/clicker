import { getFibonacciNumber } from "helpers";
import { ClickerState } from "./types";

export enum ActionType {
    IncrementCounter = "INCREMENT_COUNTER",
    IncrementLevel = "INCREMENT_LEVEL",
    IncrementWorkerLevel = "INCREMENT_WORKER_LEVEL",
    DoWork = "DoWork",
}

type State = ClickerState;

export type Action = IncrementCounter | IncrementLevel | IncrementWorkerLevel | DoWork;

type IncrementCounter = {
    type: ActionType.IncrementCounter;
};

type IncrementLevel = {
    type: ActionType.IncrementLevel;
};

type IncrementWorkerLevel = {
    type: ActionType.IncrementWorkerLevel;
};

type DoWork = {
    type: ActionType.DoWork;
};

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ActionType.IncrementCounter: {
            const newCounter = state.counter + state.level;

            return {
                ...state,
                totalClicks: state.totalClicks + 1,
                counter: newCounter,
            };
        }
        case ActionType.IncrementLevel: {
            const newLevel = state.level + 1;
            const newCounter = state.counter - state.clickerUpgradeCost;
            const newClickerUpgradeCost = getFibonacciNumber(newLevel);

            return {
                ...state,
                level: newLevel,
                counter: newCounter,
                clickerUpgradeCost: newClickerUpgradeCost,
            };
        }
        case ActionType.IncrementWorkerLevel: {
            const newWorkerLevel = state.workerLevel + 1;
            const newCounter = state.counter - state.workerUpgradeCost;
            const newWorkerUpgradeCost = getFibonacciNumber(newWorkerLevel + 2);

            return {
                ...state,
                workerLevel: newWorkerLevel,
                counter: newCounter,
                workerUpgradeCost: newWorkerUpgradeCost,
            };
        }
        case ActionType.DoWork: {
            const newCounter = state.counter + state.workerLevel;

            return {
                ...state,
                counter: newCounter,
            };
        }
        default:
            return state;
    }
}
