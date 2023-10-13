'use client';

import React, {
} from 'react';

import AccordionItems from './AccordionItem';

import styles from './stylesAccordion.module.css';

interface AccordionItem {
  id: string | number;
  title: string,
  description: string,
}

interface AccordionPropsType {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionPropsType> = ({
  items,
}) => {
  return (
    <ul className={ styles.accordionContainer } role='list'>
      { items.map(({ id, ...data }) => (
        <AccordionItems
          key={ id }
          title={ data.title }
          description={ data.description }
        />
      ))}
    </ul>
  );
};

export default Accordion;