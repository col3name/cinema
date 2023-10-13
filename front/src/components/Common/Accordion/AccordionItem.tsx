'use client';
import React, { useState } from 'react';
import cn from 'classnames';

import Button from '@/components/Common/Button';
import Paragraph from '@/components/Common/Paragraph/Paragraph';
import ArrowIcon from '@/components/Common/icons/arrow';

import styles from './stylesAccordion.module.css';

export type AccordionItemPropsType = {
  title: string,
  description: string,
  className?: string,
};

const AccordionItem: React.FC<AccordionItemPropsType> = ({
  className,
  title,
  description,
}) => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div className={ cn(styles.accordionItem, className)}>
      <div className={ styles.accordionTitleWrapper }>
        <Button
          className={ styles.accordionButton }
          onClick={ toggle }
        >
          <span className={ styles.accordionTitle }>{ title }</span>
        </Button>
        <ArrowIcon className={ isShowing ? styles.accordionItemOpened : ''} />
      </div>
      { isShowing && <div className={ styles.accordionContent}>
        <Paragraph text={ description } />
      </div> }
    </div>
  );
}

export default AccordionItem;
