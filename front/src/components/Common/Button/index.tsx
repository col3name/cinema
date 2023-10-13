/* eslint-disable react/button-has-type */
import React, {MouseEventHandler} from 'react';
import cn from 'classnames';

import styles from './stylesButton.module.css';

export type ButtonPropsType = {
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean,
  iconOnly?: boolean,
  small?: boolean,
  success?: boolean,
  mutted?: boolean,
  large?: boolean,
  loading?: boolean,
  panelAction?: boolean,
  popupAction?: boolean,
  children?: React.ReactNode,
  className?: string,
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  warn?: boolean,
  alert?: boolean,
  done?: boolean,
}

const Button: React.FC<ButtonPropsType> = ({
  type = 'button',
  disabled,
  onClick,
  className,
  children
}) => {
  return (
    <button
      className={ cn(styles.button, className,) }
      type={ type }
      disabled={ disabled }
      onClick={ onClick }
    >
      { children }
    </button>
  );
};

export default Button;
