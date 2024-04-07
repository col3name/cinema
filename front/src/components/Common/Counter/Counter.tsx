import React from "react";
import cn from "classnames";

import styles from "./stylesCounter.module.css";

import { useTicketCount } from "@/redux/features/cart/selector";

export type CounterPropsType = {
  className?: string;
};

const Counter: React.FC<CounterPropsType> = ({ className }) => {
  const count = useTicketCount();
  if (count === 0) {
    return null;
  }
  return <div className={cn(styles.counter, className)}>{count}</div>;
};

export default Counter;
