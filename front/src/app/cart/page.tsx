'use client';
import React from 'react';

import PageContent from '@/components/Common/PageContent';
import CartSummary from '@/components/Cart/CartSummary';
import CartList from '@/components/Cart/CartList';
import Layout from '@/components/Layout';
import PopupFilmRemove from "@/components/Cart/popups/PopupFilmRemove";

export type CartPagePropsType = {};

const CartPage: React.FC<CartPagePropsType> = () => {
  return <Layout>
    <PageContent>
      <CartList />
      <CartSummary />
      <PopupFilmRemove />
    </PageContent>
  </Layout>
};

export default CartPage