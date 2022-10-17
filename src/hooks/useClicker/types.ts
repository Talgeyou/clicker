export type Worker = {
    id: string;
    level: number;
    upgradeCost: number;
};

export type ClickerState = {
    counter: number;
    totalClicks: number;
    level: number;
    clickerUpgradeCost: number;
    workers: Worker[];
    workerBuyCost: number;
};

export type ClickerHookResult = {
    state: ClickerState;
    incrementCounter: () => void;
    incrementLevel: () => void;
    incrementWorkerLevel: (workerId: string) => void;
    addWorker: () => void;
};
