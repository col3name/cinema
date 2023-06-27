/* eslint-disable react/button-has-type */
import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './stylesLinkText.module.css';

export type LinkTextPropsType = {
  className?: string,
  href: string,
  text: string,
};

const LinkText: React.FC<LinkTextPropsType> = ({
  className,
  href,
  text,
}) => {
  return (
    <Link href={ href }>
      <span className={ cn(styles.linkText, className) }>{ text }</span>
    </Link>
  )
};

export default LinkText;
