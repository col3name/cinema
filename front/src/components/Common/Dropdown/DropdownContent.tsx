import React, {useContext} from 'react';
import cn from 'classnames';

import styles from './Dropdown.module.css';

import { DropdownContext, DropdownContentPropsType} from './Dropdown.props';

const DropdownContent: React.FC<DropdownContentPropsType> = ({
  children,
}) => {
  const { isActive } = useContext(DropdownContext);
  return (
    <div
      className={ cn(styles.dropdownContent, {
        [styles.dropdownContentActive]: isActive
      }) }
    >
      { children }
    </div>
  )
}

export default DropdownContent;
