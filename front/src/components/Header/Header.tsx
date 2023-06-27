import React from 'react';
import Link from 'next/link';

import BasketIcon from '@/components/Common/icons/basket/index';
import Counter from '@/components/Common/Counter';
import LinkText from '@/components/Common/LinkText';

import styles from './stylesHeader.module.css';
import {Providers} from "@/redux/store/provider";

export type HeaderPropsType = {
};

const Header: React.FC<HeaderPropsType> = ({
}) => {
  return <Providers>
    <header className={ styles.header }>
      <LinkText href={'/' }  text="Билетопоиск" />
      <Link href="/cart" style={ { display: 'flex', gap: '10px', alignItems: 'center' } }>
        <Counter />
        <BasketIcon />
      </Link>
    </header>;
  </Providers>
};

export default Header;
