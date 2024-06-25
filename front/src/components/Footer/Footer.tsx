import React from "react";

import LinkText from "@/shared/ui/LinkText";

import styles from "./styleslFooter.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <LinkText href="/faq" text="Вопросы ответы" />
      <LinkText href="/about-us" text="О нас" />
    </footer>
  );
};

export default Footer;
