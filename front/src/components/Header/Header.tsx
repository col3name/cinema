import React from 'react';
import Link from 'next/link';

import BasketIcon from '@/components/Common/icons/basket/index';
import Counter from '@/components/Common/Counter';
import LinkText from '@/components/Common/LinkText';

import styles from './stylesHeader.module.css';

export type HeaderPropsType = {
};

const Header: React.FC<HeaderPropsType> = ({
}) => {
  return <header className={ styles.header }>
    <LinkText href={'/' }  text="Билетопоиск" />
    <Link href="/cart" style={ { display: 'flex', gap: '10px', alignItems: 'center' } }>
      <Counter count={ 10 } />
      <BasketIcon />
    </Link>
  </header>;
};

export default Header;
