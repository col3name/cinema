import React, {forwardRef, MouseEventHandler} from "react";
import cn from "classnames";

import styles from "./stylesButton.module.css";

export type ButtonPropsType = {
  type?: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  iconOnly?: boolean;
  small?: boolean;
  success?: boolean;
  mutted?: boolean;
  large?: boolean;
  loading?: boolean;
  panelAction?: boolean;
  popupAction?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  warn?: boolean;
  alert?: boolean;
  done?: boolean;
};

const Button: React.FC<ButtonPropsType> = forwardRef<HTMLButtonElement, ButtonPropsType>(function Button({
                                                        type = "button",
                                                        disabled,
                                                        done = false,
                                                        onClick,
                                                        className,
                                                        children,
                                                      }, ref)  {
  return (
      <button
          ref={ref}
          className={cn(styles.button, className, {
            [styles.buttonDone]: done,
          })}
          type={type}
          disabled={disabled}
          onClick={onClick}
      >
        {children}
      </button>
  );
});

export default Button;
