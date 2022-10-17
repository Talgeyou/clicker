import { getFibonacciNumber } from "helpers";
import { Reducer, useCallback, useEffect, useReducer } from "react";
import { Action, ActionType, reducer } from "./reducer";
import { ClickerHookResult, ClickerState } from "./types";

const initialState: ClickerState = {
    level: 1,
    counter: 0,
    totalClicks: 0,
    clickerUpgradeCost: getFibonacciNumber(1),
    workers: [],
    workerBuyCost: getFibonacciNumber(6),
};

export function useClicker(): ClickerHookResult {
    const [state, dispatch] = useReducer<Reducer<ClickerState, Action>>(reducer, initialState);

    const incrementCounter = useCallback(() => {
        dispatch({
            type: ActionType.IncrementCounter,
        });
    }, []);

    const incrementLevel = useCallback(() => {
        dispatch({
            type: ActionType.IncrementLevel,
        });
    }, []);

    const incrementWorkerLevel = useCallback((workerId: string) => {
        dispatch({
            type: ActionType.IncrementWorkerLevel,
            payload: workerId,
        });
    }, []);

    const addWorker = useCallback(() => {
        dispatch({
            type: ActionType.AddWorker,
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({
                type: ActionType.DoWork,
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return {
        state,
        incrementCounter,
        incrementLevel,
        incrementWorkerLevel,
        addWorker,
    };
}
