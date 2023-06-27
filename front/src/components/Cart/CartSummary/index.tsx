import React from 'react';
import cn from 'classnames';

import Paragraph from '@/components/Common/Paragraph/Paragraph';

import styles from './stylesCartSummary.module.css';
import {useSelector} from "react-redux";

export type CartSummaryPropsType = {
  className?: string,
};

const Counter = () =>  {
  const count = useSelector((state) => state.cart).reduce((acc, it) => it.quantity + acc, 0);
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
