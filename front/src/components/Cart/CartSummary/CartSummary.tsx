import React from 'react';
import cn from 'classnames';

import Paragraph from '@/components/Common/Paragraph';
import {Counter} from '@/components/Cart/CartSummary/Counter';

import styles from './stylesCartSummary.module.css';

export type CartSummaryPropsType = {
  className?: string,
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
