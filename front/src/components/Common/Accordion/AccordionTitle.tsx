import React, {useContext} from 'react';
import cn from 'classnames';

import Button from '@/components/Common/Button';
import ArrowIcon from '@/components/Common/icons/arrow';

import styles from './stylesAccordion.module.css';

import {AccordionContext, AccordionTitlePropsType} from './Accordion.props';

const AccordionTitle: React.FC<AccordionTitlePropsType> = ({
  className = '',
  text,
}) => {
  const { isActive, toggle } = useContext(AccordionContext);
  return (
    <div className={ cn(styles.accordionTitleWrapper, className) }>
      <Button
        className={ styles.accordionButton }
        onClick={ toggle }
      >
        <span className={ styles.accordionTitle }>{ text }</span>
      </Button>
      <ArrowIcon className={ isActive ? styles.accordionItemOpened : ''} />
    </div>
  )
}

export default AccordionTitle;