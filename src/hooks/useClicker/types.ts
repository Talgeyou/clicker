export type ClickerState = {
    counter: number;
    totalClicks: number;
    level: number;
    workerLevel: number;
    clickerUpgradeCost: number;
    workerUpgradeCost: number;
};

export type ClickerHookResult = {
    state: ClickerState;
    incrementCounter: () => void;
    incrementLevel: () => void;
    incrementWorkerLevel: () => void;
};
