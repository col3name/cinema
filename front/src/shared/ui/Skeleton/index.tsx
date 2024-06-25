import React from 'react';
import cn from "classnames";

import styles from "./stylesSkeleton.module.css";

type SkeletonProps = {
    className?: string
    width: string | number;
    height: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width = 120,
    height = 40,
    className,
}) => {
    return (
        <div className={cn(styles.skeletonWrapper, className)} style={{width, height}}></div>
    )
}