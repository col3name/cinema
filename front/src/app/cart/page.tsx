'use client';
import React from 'react';

import PageContent from '@/components/Common/PageContent';
import CartSummary from '@/components/Cart/CartSummary';
import CartList from '@/components/Cart/CartList';
import Layout from '@/components/Layout';

import {RootState} from '@/redux/store';
import {useAppSelector} from '@/redux/hooks';

export type CartPagePropsType = {};

const CartPage: React.FC<CartPagePropsType> = () => {
  const films = useAppSelector((state: RootState) => state.cart.films);

  return <Layout>
    <PageContent>
      <CartList
        films={ films }
      />
      <CartSummary />
    </PageContent>
  </Layout>
};

export default CartPage