import React from 'react';
import cn from 'classnames';

import styles from './stylesCounter.module.css';

import {useAppSelector} from '@/redux/hooks';
import {RootState} from '@/redux/store';
import {FilmOnCart} from '@/redux/features/cart/slice';

export type CounterPropsType = {
  className?: string,
};

const Counter: React.FC<CounterPropsType> = ({
  className,
}) => {
  const count = useAppSelector((state: RootState) => state.cart.films)
    .reduce((acc: number, it: FilmOnCart) => it.quantity + acc, 0);
  if (count === 0) {
    return null
  }
  return (
    <div className={ cn(styles.counter, className) }>{ count }</div>
  );
};


export default Counter;
