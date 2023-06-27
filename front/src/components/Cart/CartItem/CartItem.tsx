import React from 'react';

export type CartItemPropsType = {
  smallFilmPoster: string,
  name: string,
  tickerCount: number,
  addFilmToCart: (filmId: string) => void,
  removeFilmFromCart: (filmId: string) => void,
  removeFromCart: (filmId: string, count: string) => void,
};

const CartItem: React.FC<CartItemPropsType> = ({
}) => {
  return <>Cart Item</>
};

export default CartItem;