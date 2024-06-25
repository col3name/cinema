import React from "react";
import cn from "classnames";

import styles from "./stylesParagraph.module.css";

export type ParagraphPropsType = {
  text?: string;
  className?: string;
  children?: React.ReactNode;
  bold?: boolean;
};

const Paragraph: React.FC<ParagraphPropsType> = ({
  text,
  className = "",
  children,
  bold = false,
}) => {
  return (
    <p
      className={cn(styles.paragraph, className, {
        [styles.paragraphBold]: bold,
      })}
    >
      {text && text}
      {children && children}
    </p>
  );
};

export default Paragraph;
