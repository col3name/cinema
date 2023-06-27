import React from 'react';
import cn from 'classnames';

import styles from './stylesTitle.module.css';

export type TitlePropsType = {
  text?: string,
  className?: string,
  children?: string,
};

const Title: React.FC<TitlePropsType> = ({
  text,
  className = '',
  children,
}) => {
  return <h2 className={ cn(styles.title, className) } >
    { text && text }
    { children && children }
  </h2>
}

export default Title;
