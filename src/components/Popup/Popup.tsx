import React, { memo, ReactNode } from "react";
import { Title, Portal, Icon, Button } from "components";
import { IconName } from "components/Icon/types";
import styles from "./Popup.module.scss";

type Props = { children: ReactNode; isOpened: boolean; title?: string; onClose: () => void };

function Popup({ children, isOpened, title, onClose }: Props) {
    if (!isOpened) {
        return null;
    }

    return (
        <Portal>
            <div className={styles["Overlay"]} onClick={onClose} role={"button"}></div>
            <div className={styles["Popup"]}>
                <div className={styles["Popup_Header"]}>
                    {title ? (
                        <Title className={styles["Popup_Title"]} as={"h3"} level={2}>
                            {title}
                        </Title>
                    ) : null}
                    <Button className={styles["Popup_Button"]} onClick={onClose}>
                        <Icon iconName={IconName.Close} />
                    </Button>
                </div>
                <div className={styles["Popup_Content"]}>{children}</div>
            </div>
        </Portal>
    );
}

export default memo(Popup);
