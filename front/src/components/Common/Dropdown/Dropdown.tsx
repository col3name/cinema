import React, {useCallback, useState} from 'react';

import DropdownItem from './DropdownItem';
import DropdownContent from './DropdownContent';
import DropdownContainer from './DropdownContainer';
import DropdownTitle from './DropdownTitle';

import {DropdownContext, DropdownPropsType} from './Dropdown.props';

const Dropdown: React.FC<DropdownPropsType> = ({
  className = '',
  options = [],
  placeholder = 'Все',
  defaultText = 'Не выбрано',
  defaultValue = '',
  onSelected,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selected, setIsSelected] = useState<string|undefined>(placeholder);

  const toggle = useCallback(() => setIsActive((old: boolean) => !old), [setIsActive]);

  // eslint-disable-next-line
  // @ts-ignore
  const onSelect = useCallback((e) => {// eslint-disable-line
    const { textContent } = e.target;
    const newValue = (textContent === defaultText ? defaultValue: textContent).trim();
    onSelected(newValue);
    setIsSelected(newValue);
    toggle();
  }, [defaultText, defaultValue, onSelected, toggle]);
  return (
    <DropdownContext.Provider value={ { isActive, selected, toggle }}>
      <DropdownContainer className={ className !== undefined ? className : '' }>
        <DropdownTitle placeholder={ placeholder } />
        <DropdownContent>
          <DropdownItem key="default" onSelect={ onSelect }>{ defaultText }</DropdownItem>
          { options.map((option) => (
            <DropdownItem key={ option.value } onSelect={ onSelect }>{option.value}</DropdownItem>
          ))}
        </DropdownContent>
      </DropdownContainer>
    </DropdownContext.Provider>
  )
}

export default Dropdown;
