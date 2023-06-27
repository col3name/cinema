import React from 'react';
import cn from 'classnames';

import styles from './stylesFilterTitle.module.css';

export type FilterTitlePropsType = {
  title: string,
  className?: string,
};

const FilterTitle: React.FC<FilterTitlePropsType> = ({
  title,
  className = '',
}) => {
  return <h2 className={ cn(styles.filterTitle, className) } > { title }</h2>
}

export default FilterTitle;
