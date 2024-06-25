"use client";
import React from "react";
import cn from "classnames";
import Link from "next/link";

import FilmInfo from "@/widgets/Film/FilmSearch/FilmInfo";

import styles from "./stylesCartList.module.css";

import {
    FilmOnCart,
    useCartFilmsSelector,
} from "@/entities/cart";
import FilmActions from "@/features/film/FilmActions/FilmActions";
import {Film} from "@/api";

export type CartListPropsType = {
  className?: string;
};

const CartList: React.FC<CartListPropsType> = ({ className }) => {
  const films = useCartFilmsSelector();

  if (films.length === 0) {
    return (
      <div>
        <p>Пустая корзина</p>
        <Link href="/">
          <h3>Каталог фильмов</h3>
        </Link>
      </div>
    );
  }

  return (
    <div className={cn(styles.cartContainer, className)}>
      {films.map((film: FilmOnCart) => (
        <FilmInfo
          key={film?.id}
          film={{ ...film, quantity: undefined }}
        >
          <FilmActions film={film as Film} enableRemove={true} />
        </FilmInfo>
      ))}
    </div>
  );
};

export default CartList;
