'use client';
import React from 'react';

import PageContent from '@/components/Common/PageContent';
import CartSummary from "@/components/Cart/CartSummary";
import CartList, from "@/components/Cart/CartList";
import Layout from "@/components/Layout";
import { useSelector } from "react-redux";

export type CartPagePropsType = {};

const CartPage: React.FC<CartPagePropsType> = () => {
  const films = useSelector((state) => state.cart);

  return <Layout>
    <PageContent>
      <CartList
        films={ films }
        addOneFilmToOrder={ () => {} }
        removeFilmFromOrder={ () => {} }
        removeOneFilmFromOrder={ () => {} }
      />
      <CartSummary />
    </PageContent>
  </Layout>
};

export default CartPage