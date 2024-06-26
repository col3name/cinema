import React from "react";
import Link from "next/link";

import BasketIcon from "@/shared/ui/icons/basket/index";
import Counter from "@/shared/ui/Counter";
import LinkText from "@/shared/ui/LinkText";

import styles from "./stylesHeader.module.css";

const Header = ({ disableCounter = false }) => {
  return (
    <header className={styles.header}>
      <LinkText href={"/"} large text="Билетопоиск" />
      <Link
        href="/cart"
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        {!disableCounter && <Counter />}
        <BasketIcon />
      </Link>
    </header>
  );
};

export default Header;
