import React from 'react';

import LinkText from '@/components/Common/LinkText';

import styles from './styleslFooter.module.css';

export type FooterPropsType = {
};

const Footer: React.FC<FooterPropsType> = ({
}) => {
  return <footer className={ styles.footer }>
    <LinkText href='/faq' text="Вопросы ответы" />
    <LinkText href='/about-us' text="О нас" />
  </footer>
};

export default Footer;
