"use client";

import React from "react";

import FilmDetailsItem from "@/components/Film/FilmDetails";
import Reviews from "@/components/Film/Reviews";
import {Skeleton} from "@/components/Common/Skeleton";

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
