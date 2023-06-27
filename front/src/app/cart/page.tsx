'use client';
import React from 'react';

import PageContent from '@/components/Common/PageContent';
import CartSummary from "@/components/Cart/CartSummary";
import CartList, {CartFilm} from "@/components/Cart/CartList";
import Layout from "@/components/Layout";

export type CartPagePropsType = {};

const films = [{
  id: '1',
  cinema: '2',
  name: 'filamsdfads',
  posterUrl: "https://i.postimg.cc/pdCLNMqX/1.webp",
  ticketCount: 10,
}] as CartFilm[];

const CartPage: React.FC<CartPagePropsType> = () => {
  const addOneFilmToOrder = (filmId: string) => {
    console.log(addOneFilmToOrder, filmId);
  };
  const removeFilmFromOrder = (filmId: string) => {
    console.log(removeFilmFromOrder, filmId);
  };
  const removeOneFilmFromOrder = (filmId: string) => {
    console.log(removeOneFilmFromOrder, filmId);
  };
  return <Layout>
    <PageContent>
      <CartList
        films={ films }
        addOneFilmToOrder={ () => {} }
        removeFilmFromOrder={ () => {} }
        removeOneFilmFromOrder={ () => {} }
      />
      <CartSummary count={7}/>
    </PageContent>
  </Layout>
};

export default CartPage