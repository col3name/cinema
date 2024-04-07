import React, { useContext } from "react";
import cn from "classnames";

import styles from "./Dropdown.module.css";

import { DropdownContainerPropsType, DropdownContext } from "./Dropdown.props";

const DropdownContainer: React.FC<DropdownContainerPropsType> = ({
  className,
  children,
}) => {
  const { isActive } = useContext(DropdownContext);
  return (
    <div
      className={cn(styles.dropdown, className, {
        [styles.dropdownActive]: isActive,
      })}
    >
      {children}
    </div>
  );
};

export default DropdownContainer;
