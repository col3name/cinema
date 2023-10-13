import React, {useContext} from 'react';

import styles from '@/components/Common/Accordion/stylesAccordion.module.css';

import {AccordionContext} from './Accordion.props';

export type AccordionContentPropsType = {
  children: React.ReactNode,
}

const AccordionContent: React.FC<AccordionContentPropsType> = ({
  children,
}) => {
  const { isActive } = useContext(AccordionContext)
  if (!isActive) {
    return null
  }
  console.log({isActive})

  return <div className={ styles.accordionContent }>
    { children }
  </div>;
}

export default AccordionContent;