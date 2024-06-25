import React from "react";
import cn from "classnames";

import Paragraph from "@/shared/ui/Paragraph";
import { TicketCounter } from "@/widgets/Cart/CartSummary/ui/TicketCounter";

import styles from "./stylesCartSummary.module.css";

export type CartSummaryPropsType = {
  className?: string;
};

const CartSummary: React.FC<CartSummaryPropsType> = ({ className }) => {
  return (
    <div className={cn(styles.cartSummary, className)}>
      <Paragraph bold text="Итого билетов: " />
      <TicketCounter />
    </div>
  );
};

export default CartSummary;
