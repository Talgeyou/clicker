import React, { memo } from "react";
import { IconName } from "./types";
import styles from "./Icon.module.scss";

type Props = { iconName: IconName };

function Icon({ iconName }: Props) {
    return <span className={styles["Icon"]}>{iconName}</span>;
}

export default memo(Icon);
