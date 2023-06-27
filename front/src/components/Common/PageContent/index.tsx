import React from 'react';
import cn from 'classnames';

import styles from './stylesPageContent.module.css';

export type PageContentPropsType = {
  className?: string,
  children: React.ReactNode,
};

const PageContent: React.FC<PageContentPropsType> = ({
  className,
  children,
}) => {
  return (
    <main className={ cn(styles.content, className) }>
      { children && children }
    </main>
  )
};

export default PageContent;
