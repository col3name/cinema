import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { debounce } from 'lodash';

import styles from '../stylesForm.module.css';

export type TextareaPropsType = {
  selectAllOnMount?: boolean,
  placeholder?: string,
  onChange: (value: string) => void,
};

const Input: React<TextareaPropsType> = (props) => {
  const {
    className,
    selectAllOnMount,
    placeholder,
    onChange,
  } = props;
  const inputRef = useRef<HTMLInputElement>();
  useEffect(() => {
    if (selectAllOnMount) {
      inputRef.current?.select();
    }
  }, [selectAllOnMount]);

  return (
    <input
      { ...props }
      placeholder={ placeholder }
      ref={ inputRef }
      className={ cn(styles.input, className) }
      onChange={  debounce((event) => {
        onChange(event.target.value)
      }, 100) }
    />
  );
};

export default Input;
