import React, {MouseEventHandler} from "react";

import styles from './stylesContainer.module.css';

type ContainerProps = {
    children: React.ReactNode;
    onClick?: MouseEventHandler<HTMLDivElement> | undefined;
};

export const Container: React.FC<ContainerProps> = ({
                                                        children, onClick
                                                    }) => {
    return (
        <div className={styles.container} onClick={onClick}>{children}</div>
    );
};
