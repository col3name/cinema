import React from 'react';
import cn from 'classnames';

import styles from './stylesCounter.module.css';

export type CounterPropsType = {
  className?: string,
  count: number,
};

const Counter: React.FC<CounterPropsType> = ({
  className,
  count,
}) => {
  return (
    <div className={ cn(styles.counter, className)}> { count }</div>
  );
};

export default Counter;
