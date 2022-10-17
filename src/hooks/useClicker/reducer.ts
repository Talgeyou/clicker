import { v4 } from "uuid";
import { getFibonacciNumber } from "helpers";
import { ClickerState } from "./types";

export enum ActionType {
    IncrementCounter = "INCREMENT_COUNTER",
    IncrementLevel = "INCREMENT_LEVEL",
    IncrementWorkerLevel = "INCREMENT_WORKER_LEVEL",
    DoWork = "DoWork",
    AddWorker = "ADD_WORKER",
}

type State = ClickerState;

export type Action = IncrementCounter | IncrementLevel | IncrementWorkerLevel | DoWork | AddWorker;

type IncrementCounter = {
    type: ActionType.IncrementCounter;
};

type IncrementLevel = {
    type: ActionType.IncrementLevel;
};

type IncrementWorkerLevel = {
    type: ActionType.IncrementWorkerLevel;
    payload: string;
};

type DoWork = {
    type: ActionType.DoWork;
};

type AddWorker = {
    type: ActionType.AddWorker;
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
            const worker = state.workers.find((item) => item.id === action.payload);

            if (!worker) return state;

            const newWorkerLevel = worker.level + 1;
            const newCounter = state.counter - worker.upgradeCost;
            const newWorkerUpgradeCost = getFibonacciNumber(newWorkerLevel + 6);

            return {
                ...state,
                workers: state.workers.map((item) =>
                    item.id === action.payload
                        ? { ...item, level: newWorkerLevel, upgradeCost: newWorkerUpgradeCost }
                        : item,
                ),
                counter: newCounter,
            };
        }
        case ActionType.DoWork: {
            const newCounter =
                state.counter +
                state.workers.reduce(
                    (accumulator, currentWorker) => (accumulator += currentWorker.level),
                    0,
                );

            return {
                ...state,
                counter: newCounter,
            };
        }
        case ActionType.AddWorker: {
            return {
                ...state,
                workers: [
                    ...state.workers,
                    { id: v4(), level: 1, upgradeCost: getFibonacciNumber(7) },
                ],
                counter: state.counter - state.workerBuyCost,
            };
        }
        default:
            return state;
    }
}
