import React from "react";

import {useElapsedSeconds} from "@/entities/typeRacing/selector";

export const ElapsedSecond = () => {
    const elapsed = useElapsedSeconds();

    return <span>{elapsed}</span>
}
