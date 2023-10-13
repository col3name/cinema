import React from 'react';
import cn from 'classnames';

import styles from '../stylesForm.module.css';

export type LabelPropsType = {
  className?: string,
  title: string,
  children: React.ReactNode,
};

const Label: React.FC<LabelPropsType> = ({
  className,
  title,
  children
}) => {
  return (
    <div className={ cn(styles.label, className) }>
      <p className={ styles.labelTitle }>{ title }</p>
      { children && children}
    </div>
  );
};

export default Label;
