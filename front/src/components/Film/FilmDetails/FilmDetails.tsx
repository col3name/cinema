"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";

import DataHOC from "@/components/Common/DataHOC";
import Title from "@/components/Common/Tite";
import Paragraph from "@/components/Common/Paragraph";
import FilmDescriptionItem from "./FilmDescriptionItem";
import FilmActionsWrapper from "@/components/Film/FilmDetails/FilmActionsWrapper";
import Button from "@/components/Common/Button";
import BookEditor from "./BookEditor";

import styles from "./stylesFilmDetail.module.css";

import { Film } from "@/api";
import { GenreToText } from "@/shared/lib/translator";
import {
  useFetchMovie,
  useFindFilmSelector,
} from "@/redux/features/film/hooks";

export type FilmCardPropsType = {
  filmId: string;
};

interface FilmDataProps {
  film: Film;
  onReadBook: (filmId: string) => void;
}

const FilmData: React.FC<FilmDataProps> = ({
  film,
  onReadBook,
}: FilmDataProps) => {
  return (
    <div className={styles.filmDetailsContainer}>
      <div className={styles.filmContainer}>
        <Image
          className={styles.filmPoster}
          src={film.posterUrl}
          alt="film poster"
          width={320}
          height={240}
        />
        <div className={styles.filmContent}>
          <div className={styles.filmHeader}>
            <Title text={film.title} />
            <FilmActionsWrapper film={film} />
          </div>
          <FilmDescriptionItem
            title="Жанр: "
            description={GenreToText[film.genre]}
          />
          <FilmDescriptionItem
            title="Год выпуска: "
            description={film.releaseYear}
          />
          <FilmDescriptionItem title="Рейтинг: " description={film.rating} />
          <FilmDescriptionItem title="Режиссер: " description={film.director} />
          <FilmDescriptionItem title="Описание: " />
          <Paragraph text={film.description} />
          <Button onClick={() => onReadBook(film.id)}>Read</Button>
        </div>
      </div>
    </div>
  );
};

const FilmDetails: React.FC<FilmCardPropsType> = ({ filmId }) => {
  const film = useFindFilmSelector(filmId) as Film;
  const [isEditor, setIsEditor] = useState(false);
  const { isLoading, error } = useFetchMovie(filmId);

  if (isEditor) {
    return <BookEditor filmId={filmId} onClose={() => setIsEditor(false)} />;
  }
  return (
    <DataHOC data={film} isLoading={isLoading} loaderText="movie" error={error}>
      <FilmData
        film={film}
        onReadBook={(filmId: string) => {
          setIsEditor(true);
        }}
      />
    </DataHOC>
  );
};

export default FilmDetails;
