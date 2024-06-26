import React, { useContext } from "react";

import styles from "./stylesAccordion.module.css";

import { AccordionContext } from "./Accordion.props";

export type AccordionContentPropsType = {
  children: React.ReactNode;
};

const AccordionContent: React.FC<AccordionContentPropsType> = ({
  children,
}) => {
  const { isActive } = useContext(AccordionContext);
  if (!isActive) {
    return null;
  }

  return <div className={styles.accordionContent}>{children}</div>;
};

export default AccordionContent;
