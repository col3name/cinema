import React from "react";

import {useElapsedSeconds} from "@/entities/race/selector";

export const TimerView = () => {
    const elapsed = useElapsedSeconds();

    return <span>{elapsed}</span>
}
