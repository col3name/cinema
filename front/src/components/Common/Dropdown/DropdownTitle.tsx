import React, {useContext} from 'react';
import cn from 'classnames';

import Arrow from '@/components/Common/icons/arrow';

import styles from './Dropdown.module.css';

import {DropdownContext, DropdownTitlePropsType} from './Dropdown.props';

const DropdownTitle: React.FC<DropdownTitlePropsType> = ({
  placeholder = '',
  children = null
}) => {
  const {isActive, selected, toggle} = useContext(DropdownContext);
  return (
    <div
      className={ styles.dropdownBtn }
      onClick={toggle}
    >
      <span className={ isActive ? styles.dropdownTitleActive : '' }>{selected || placeholder}</span>
      {children && children }
      <Arrow className={ cn(styles.dropdownIcon, {
        [styles.dropdownIconActive]: isActive
      })} />
    </div>
  )
}

export default DropdownTitle;
