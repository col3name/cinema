import React from 'react';
import cn from 'classnames';

import styles from './stylesCounter.module.css';
import {useSelector} from "react-redux";

export type CounterPropsType = {
  className?: string,
};

const Counter: React.FC<CounterPropsType> = ({
                                               className,
                                             }) => {
  // const count = useSelector((state) => state.cart).reduce((acc, it) => it.quantity + acc, 0);

  return (
    <div className={cn(styles.counter, className)}> {0 }</div>
  );
};

export default Counter;
