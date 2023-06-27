'use client';
import React from 'react';

import Button from '@/components/Common/Button';
import MinusIcon from '@/components/Common/icons/minus';
import PlusIcon from '@/components/Common/icons/plus';

import styles from './stylesFilmAction.module.css';
import CloseIcon from "@/components/Common/icons/close";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "@/redux/store/features/cartSlice";

export type FilmActionPropsType = {
  film: any,
  needRemove: boolean,
};

const FilmActions: React.FC<FilmActionPropsType> = ({
  film,
  needRemove = false,
}) => {
  const films = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onAddFilm = (e) => {
    e.stopPropagation();
    dispatch(addToCart(film))
  };
  const onRemoveFromOrder = (e) => {
    e.stopPropagation();
    dispatch(removeFromCart(film))
  };

  let filter = films.filter(it => it.id === film.id);
  return <div className={ styles.filmActions }>
    <Button className={ styles.filmRemoveButton } onClick={ onRemoveFromOrder }>
      <MinusIcon />
    </Button>
    <p>{ filter && filter[0]?.quantity || 0 } </p>
    <Button className={ styles.filmAddButton } onClick={ onAddFilm }>
      <PlusIcon />
    </Button>
    { needRemove &&  <CloseIcon className={ styles.removeButton } onClick={ onRemoveFromOrder } />}
  </div>
};

export default FilmActions;
