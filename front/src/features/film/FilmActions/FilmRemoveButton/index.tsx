import React, {MouseEvent} from "react";

import CloseIcon from "@/shared/ui/icons/close";

import {useRemoveFromCart} from "@/entities/cart";

import styles from "@/features/film/FilmActions/stylesFilmAction.module.css";

type FilmRemoveButtonProps = {
    filmId: string;
};

export const FilmRemoveButton: React.FC<FilmRemoveButtonProps> = ({
    filmId,
}) => {
    const removeFromCart = useRemoveFromCart();
    const onRemoveFromOrder = (
        event: MouseEvent<HTMLButtonElement | SVGSVGElement>,
    ) => {
        event.stopPropagation();
        removeFromCart(filmId);
    };

    return (
        <CloseIcon
            className={styles.filmRemoveButton}
            onClick={onRemoveFromOrder}
        />
    );
};