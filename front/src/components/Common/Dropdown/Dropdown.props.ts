import React, {MouseEventHandler} from 'react';

export type DropdownItemPropsType = {
  children: React.ReactNode,
  onSelect: MouseEventHandler<HTMLDivElement> | undefined;
}

export type DropdownOption = {
  value: string
}

export type DropdownPropsType = {
  options: DropdownOption[],
  className?: string,
  placeholder?: string,
  defaultValue?: string,
  onSelected: (value: string) => void,
}

export type DropdownContextType = {
  isActive: boolean,
  selected: string|undefined,
  toggle: () => void,
}

export type DropdownContainerPropsType = {
  className?: string,
  children: React.ReactNode,
}

export type DropdownContentPropsType = {
  children: React.ReactNode,
}

export type DropdownTitlePropsType = {
  placeholder?: string,
  children?: React.ReactNode,
}

export const DropdownContext = React.createContext<DropdownContextType>({ isActive: false, selected: undefined, toggle: () => {}});
