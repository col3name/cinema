import React, {MouseEventHandler} from "react";
import cn from "classnames";

import styles from './stylesContainer.module.css';

type ContainerProps = {
    children: React.ReactNode;
    isHalf?: boolean
    onClick?: MouseEventHandler<HTMLDivElement> | undefined;
};

export const Container: React.FC<ContainerProps> = ({
                                                        isHalf = false,
                                                        children, onClick
                                                    }) => {
    return (
        <div
            className={cn(styles.container, {
                [styles.containerHalf]: isHalf
            })}
            onClick={onClick}
        >{children}</div>
    );
};
