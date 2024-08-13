import React, {useCallback} from "react";

import Button from "@/shared/ui/Button";
import {UpdateTextButton} from "@/features/race/update-text-button";

import styles from "./stylesRacingActions.module.css";

type RacingActionsProps = {
    resetTimer: VoidFunction;
    onReset: VoidFunction;
}

export const RacingActions: React.FC<RacingActionsProps> = ({
                                                                resetTimer,
                                                         onReset
                                                     }) => {

    const onClickUpdateButton = useCallback(() => {
        onReset();
        resetTimer();
    }, [onReset, resetTimer]);


    return (
        <div className={styles.actions}>
            <Button onClick={onClickUpdateButton}>restart</Button>
            <UpdateTextButton onClick={onClickUpdateButton}/>
        </div>
    )
}