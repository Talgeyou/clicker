import React, { ComponentProps, ElementType, memo, ReactNode, useCallback, useState } from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

type OwnProps<E extends ElementType = ElementType> = {
    children: ReactNode;
    className?: string;
    size?: "l" | "m" | "s";
    as?: E;
    onClick?: () => void;
};

type Props<E extends ElementType = ElementType> = OwnProps<E> &
    Omit<ComponentProps<E>, keyof OwnProps>;

const defaultElement = "button";

function Button<E extends ElementType = typeof defaultElement>({
    className,
    children,
    as,
    size,
    onClick,
    ...otherProps
}: Props<E>) {
    const TagName = as || defaultElement;

    const [state, setState] = useState<{ wasClicked: boolean; timeout: NodeJS.Timeout | null }>({
        wasClicked: false,
        timeout: null,
    });

    const handleClick = useCallback(() => {
        if (state.timeout) {
            clearTimeout(state.timeout);
        }

        const timeout = setTimeout(() => {
            setState({
                ...state,
                wasClicked: false,
            });
        }, 200);

        setState({
            wasClicked: true,
            timeout,
        });

        if (onClick) {
            onClick();
        }
    }, [onClick, state]);

    return (
        <TagName
            className={classNames(
                styles["Button"],
                {
                    [styles["Button_shake"]]: state.wasClicked,
                    [styles["Button_size_s"]]: size === "s",
                },
                className,
            )}
            onClick={handleClick}
            {...otherProps}
        >
            {children}
        </TagName>
    );
}

export default memo(Button);
