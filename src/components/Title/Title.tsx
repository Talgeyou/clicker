import React, { ComponentProps, ElementType, memo, ReactNode } from "react";
import classNames from "classnames";
import styles from "./Title.module.scss";

type OwnProps<E extends ElementType = ElementType> = {
    children: ReactNode;
    level?: 1 | 2 | 3 | 4 | 5;
    className?: string;
    as?: E;
};

type Props<E extends ElementType = ElementType> = OwnProps<E> &
    Omit<ComponentProps<E>, keyof OwnProps>;

const defaultElement = "div";

function Title<E extends ElementType = typeof defaultElement>({
    children,
    className,
    level,
    as,
    ...otherProps
}: Props<E>) {
    const TagName = as || defaultElement;

    return (
        <TagName
            className={classNames(
                styles["Title"],
                {
                    [styles["Title_level_2"]]: level === 2,
                },
                className,
            )}
            {...otherProps}
        >
            {children}
        </TagName>
    );
}

export default memo(Title);
