import React, { useEffect } from "react";
import { Button, Title } from "components";
import { useClicker } from "hooks";
import styles from "./App.module.scss";

function App(): JSX.Element {
    const { state, incrementCounter, incrementLevel, incrementWorkerLevel } = useClicker();

    useEffect(() => {
        console.log({ state });
    }, [state]);

    return (
        <div className={styles["App"]}>
            <Title as={"h1"}>Clicker Level: {state.level}</Title>
            <Title as={"h1"}>Worker Level: {state.workerLevel}</Title>
            <Title as={"h2"} level={2}>
                Clicks: {state.totalClicks}
            </Title>
            <Title as={"h2"} level={2}>
                Balance: ${state.counter}
            </Title>
            <Button as={"button"} onClick={incrementCounter}>
                Click
            </Button>
            <Button onClick={incrementLevel} disabled={state.counter < state.clickerUpgradeCost}>
                Upgrade (${state.clickerUpgradeCost})
            </Button>
            <Button
                onClick={incrementWorkerLevel}
                disabled={state.counter < state.workerUpgradeCost}
            >
                Upgrade Worker (${state.workerUpgradeCost})
            </Button>
        </div>
    );
}

export default App;
