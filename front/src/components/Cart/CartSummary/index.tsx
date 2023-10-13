import React from 'react';
import cn from 'classnames';

import Paragraph from '@/components/Common/Paragraph/Paragraph';

import styles from './stylesCartSummary.module.css';

import {useTicketCount} from '@/redux/features/cart/selector';

export type CartSummaryPropsType = {
  className?: string,
};

const Counter = () =>  {
  const count = useTicketCount();
  if (count === 0) {
    return null
  }
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
