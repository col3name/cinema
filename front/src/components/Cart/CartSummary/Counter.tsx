import React from "react";

import { useTicketCount } from "@/redux/features/cart/selector";

import Paragraph from "@/shared/ui/Paragraph";

export const Counter = () => {
  const count = useTicketCount();
  if (count === 0) {
    return null;
  }
  return <Paragraph text={`${count}`} />;
};
