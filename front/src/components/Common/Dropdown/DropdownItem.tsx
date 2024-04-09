import React, {MouseEventHandler} from "react";

import styles from "./Dropdown.module.css";

import { DropdownItemPropsType } from "./Dropdown.props";

const DropdownItem: React.FC<DropdownItemPropsType> = ({
  children,
  onSelect,
}) => {
  return (
    <div className={styles.item} onClick={(e):void => {
      const { target } = e;
      if (target instanceof HTMLDivElement) {
        let value = target.textContent as string | undefined;
        onSelect(value)
      }
    }}>
      {children}
    </div>
  );
};

export default DropdownItem;
