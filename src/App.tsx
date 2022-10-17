import React, { useCallback, useState } from "react";
import { Button, Popup, Title } from "components";
import { useClicker } from "hooks";
import styles from "./App.module.scss";

function App(): JSX.Element {
    const { state, incrementCounter, incrementLevel, incrementWorkerLevel, addWorker } =
        useClicker();

    const [isWorkersOpened, setIsWorkersOpened] = useState<boolean>(false);

    const toggleWorkersMenu = useCallback(() => {
        setIsWorkersOpened((prev) => !prev);
    }, []);

    return (
        <div className={styles["App"]}>
            <Title as={"h1"}>Clicker Level: {state.level}</Title>
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
            <Button onClick={toggleWorkersMenu}>Open workers menu</Button>
            <Popup isOpened={isWorkersOpened} title={"Workers' menu"} onClose={toggleWorkersMenu}>
                <div className={styles["Workers"]}>
                    {state.workers.map((item) => (
                        <div key={item.id} className={styles["Workers_Card"]}>
                            <Title as={"h4"} level={3}>
                                Worker Level: {item.level}
                            </Title>
                            <Button
                                disabled={state.counter < item.upgradeCost}
                                size={"s"}
                                onClick={() => incrementWorkerLevel(item.id)}
                            >
                                Upgrade Worker (${item.upgradeCost})
                            </Button>
                        </div>
                    ))}
                    <Button
                        className={"Workers_Card"}
                        disabled={state.counter < state.workerBuyCost}
                        onClick={addWorker}
                    >
                        Buy a worker (${state.workerBuyCost})
                    </Button>
                </div>
            </Popup>
        </div>
    );
}

export default App;
