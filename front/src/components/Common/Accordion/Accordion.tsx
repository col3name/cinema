'use client';

import React, { FC } from 'react';

import AccordionRow from './AccordionItem';

import styles from './stylesAccordion.module.css';

interface AccordionItem {
  id: string | number;
  title: string,
  description: string,
}

interface AccordionPropsType {
  items: AccordionItem[];
}

const Accordion: FC<AccordionPropsType> = ({
  items,
}) => {
  return (
    <ul className={ styles.accordionContainer } role='list'>
      { items.map(({ id, ...data }) => (
        <AccordionRow
          key={ id }
          title={ data.title }
          description={ data.description }
        />
      ))}
    </ul>
  );
};

export default Accordion;