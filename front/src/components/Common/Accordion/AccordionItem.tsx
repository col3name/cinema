'use client';
import React, {useCallback, useState} from 'react';
import cn from 'classnames';

import AccordionTitle from './AccordionTitle';
import AccordionContent from './AccordionContent';
import Paragraph from '@/components/Common/Paragraph/Paragraph';

import styles from './stylesAccordion.module.css';

import {AccordionContext, AccordionItemPropsType} from './Accordion.props';

const AccordionItem: React.FC<AccordionItemPropsType> = ({
  className,
  title,
  description,
}) => {
  const [isActive, setIsActive] = useState(false);

  const toggle = useCallback( () => {
    setIsActive((value: boolean) => !value);
  }, []);

  return (
    <div className={ cn(styles.accordionItem, className)}>
      <AccordionContext.Provider value={ { isActive, toggle } }>
        <AccordionTitle text={ title } />
        <AccordionContent>
          <Paragraph text={ description } />
        </AccordionContent>
      </AccordionContext.Provider>
    </div>
  );
}

export default AccordionItem;
