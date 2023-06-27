import React from 'react';
import cn from 'classnames';

import Paragraph from '@/components/Common/Paragraph/Paragraph';

import styles from './stylesCartSummary.module.css';

export type CartSummaryPropsType = {
  count: number,
  className?: string,
};

const CartSummary: React.FC<CartSummaryPropsType> = ({
  count,
  className,
}) => {
  return <div className={ cn(styles.cartSummary, className) }>
    <Paragraph bold text='Итого билетов: ' />
    <Paragraph text={ `${ count }` }/>
  </div>
}

export default CartSummary;
