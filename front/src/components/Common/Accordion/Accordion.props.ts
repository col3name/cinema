import React from "react";

export type AccordionTitlePropsType = {
  className?: string;
  text: string;
};

export type AccordionItemPropsType = {
  title: string;
  description: string;
  className?: string;
};

export type AccordionContextType = {
  isActive: boolean;
  toggle: () => void;
};

export const AccordionContext = React.createContext<AccordionContextType>({
  isActive: false,
  toggle: () => {},
});
