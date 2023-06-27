import React from 'react';
import cn from 'classnames';

import styles from './stylesPageContent.module.css';

export type PageContentPropsType = {
  className?: string,
  children: React.ReactNode,
  isFlex?: boolean
};

const PageContent: React.FC<PageContentPropsType> = ({
  className,
  children,
  isFlex = false
}) => {
  return (
    <main className={ cn(styles.content, {
      [styles.contentFlex]: isFlex
    }, className) }>
      { children && children }
    </main>
  )
};

export default PageContent;
