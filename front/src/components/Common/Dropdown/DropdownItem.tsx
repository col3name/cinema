import React from 'react';

import styles from './Dropdown.module.css';

import {DropdownItemPropsType} from './Dropdown.props';

const DropdownItem: React.FC<DropdownItemPropsType> = ({
  children,
  onSelect
}) => {
  return (
    <div
      className={ styles.item }
      onClick={onSelect}
    >
      { children }
    </div>
  )
}

export default DropdownItem;
