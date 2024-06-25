import React, {EventHandler, useCallback, useState} from "react";

import DropdownItem from "./DropdownItem";
import DropdownContent from "./DropdownContent";
import DropdownContainer from "./DropdownContainer";
import DropdownTitle from "./DropdownTitle";

import { DropdownContext, DropdownPropsType } from "./Dropdown.props";

import styles from "./Dropdown.module.css";

const Dropdown: React.FC<DropdownPropsType> = ({
  className = "",
  options = [],
  placeholder = "Все",
  defaultText = "Не выбрано",
  defaultValue = "",
  onSelected,
  isDisabled = false,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selected, setIsSelected] = useState<string | undefined>(placeholder);

  const toggle = useCallback(
    () => setIsActive((old: boolean) => !old),
    [setIsActive],
  );

  // eslint-disable-next-line
  // @ts-ignore
  const onSelect = useCallback(
    (textContent: string | undefined) => {
      let newValue = defaultValue;
      if (textContent) {
          newValue = (
              textContent === defaultText ? defaultValue : textContent
          ).trim();
      }
      onSelected(newValue);
      setIsSelected(newValue);
      toggle();
    },
    [defaultText, defaultValue, onSelected, toggle],
  );

  return (
    <DropdownContext.Provider value={{ isActive, selected, toggle }}>
      <DropdownContainer className={className !== undefined ? className : ""}>
        <DropdownTitle
          className={isDisabled ? styles.dropdownTitleDisabled : ""}
          placeholder={placeholder || ""}
        />
        <DropdownContent>
          <DropdownItem key="default" onSelect={onSelect}>
            {defaultText}
          </DropdownItem>
          {options.map((option) => (
            <DropdownItem key={option.value} onSelect={onSelect}>
              {option.value}
            </DropdownItem>
          ))}
        </DropdownContent>
      </DropdownContainer>
    </DropdownContext.Provider>
  );
};

export default Dropdown;
