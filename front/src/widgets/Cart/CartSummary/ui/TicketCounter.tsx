import React from "react";

import Paragraph from "@/shared/ui/Paragraph";

import { useTicketCount } from "@/entities/cart";

export const TicketCounter = () => {
  const count = useTicketCount();
  if (count === 0) {
    return null;
  }
  return <Paragraph text={`${count}`} />;
};
