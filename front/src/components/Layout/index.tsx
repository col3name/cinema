import React from 'react';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import styles from '@/app/page.module.css';

export type LayoutPropsType = {
  children: React.ReactNode,
};

const Layout: React.FC<LayoutPropsType> = ({
  children,
}) => {
  return <div>
    <Header />
    <main className={ styles.main }>
      { children && children }
    </main>
    <Footer />
  </div>;
};

export default Layout;
