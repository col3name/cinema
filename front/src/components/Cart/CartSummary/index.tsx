import React from 'react';
import cn from 'classnames';

import Paragraph from '@/components/Common/Paragraph/Paragraph';

import styles from './stylesCartSummary.module.css';

import {RootState} from '@/redux/store';
import {useAppSelector} from '@/redux/hooks';

export type CartSummaryPropsType = {
  className?: string,
};

const Counter = () =>  {
  const count = useAppSelector((state: RootState) => state.cart.films).reduce((acc, it) => it.quantity + acc, 0);
  return <Paragraph text={ `${ count }` }/>
};

const CartSummary: React.FC<CartSummaryPropsType> = ({
  className,
}) => {
  return <div className={ cn(styles.cartSummary, className) }>
    <Paragraph bold text='Итого билетов: ' />
    <Counter />
  </div>
}

export default CartSummary;
