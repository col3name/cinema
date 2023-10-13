import React from 'react';
import cn from 'classnames';

import Header from '@/components/Header/Header';

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
    <>
      <Header/>
      <main className={ cn(styles.content, {
        [styles.contentFlex]: isFlex
      }, className) }>
        { children && children }
      </main>
      <div id="root-modal"/>
    </>
  )
};

export default PageContent;
