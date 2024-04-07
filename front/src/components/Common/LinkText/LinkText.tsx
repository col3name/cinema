/* eslint-disable react/button-has-type */
import React from "react";
import cn from "classnames";
import Link from "next/link";

import styles from "./stylesLinkText.module.css";

export type LinkTextPropsType = {
  className?: string;
  large?: boolean;
  href: string;
  text: string;
};

const LinkText: React.FC<LinkTextPropsType> = ({
  className,
  href,
  large = false,
  text,
}) => {
  return (
    <Link href={href}>
      <span
        className={cn(styles.linkText, className, {
          [styles.linkTextLarge]: large,
        })}
      >
        {text}
      </span>
    </Link>
  );
};

export default LinkText;
