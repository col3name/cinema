"use client";
import React from "react";

import PageContent from "@/shared/ui/PageContent";
import CartSummary from "@/widgets/Cart/CartSummary";
import CartList from "@/widgets/Cart/CartList";
import Layout from "@/shared/ui/Layout";
import PopupFilmRemoveConfirm from "@/widgets/Cart/popups/PopupFilmRemoveConfirm";

export type CartPagePropsType = {};

const CartPage: React.FC<CartPagePropsType> = () => {
  return (
    <Layout>
      <PageContent>
        <CartList />
        <CartSummary />
        <PopupFilmRemoveConfirm />
      </PageContent>
    </Layout>
  );
};

export default CartPage;
