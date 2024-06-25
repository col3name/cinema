"use client";

import React from "react";

import FilmDetailsItem from "@/widgets/Film/FilmDetails";
import Reviews from "@/widgets/Film/Reviews";

export type FilmDetailsPropsType = {
  filmId: string;
};

const FilmDetails: React.FC<FilmDetailsPropsType> = ({ filmId }) => {
  return (
    <>
      <FilmDetailsItem filmId={filmId} />
      <Reviews filmId={filmId} />
    </>
  );
};

export default FilmDetails;
