"use client";
import React from "react";
import cn from "classnames";

import FilterTitle from "./FilterTitle";
import Input from "@/shared/ui/Form/Input";
import Label from "@/shared/ui/Form/Label";
import Dropdown from "@/shared/ui/Dropdown";

import styles from "./stylesFilmFilter.module.css";

import { useFilmFilterActions } from "@/features/film/FilmFilter/hooks";
import { GenreToText } from "@/shared/lib/translator";

export type FilmFilterPropsType = {
  className?: string;
};

const FilmFilter: React.FC<FilmFilterPropsType> = ({ className }) => {
  const {
    cinemas,
    genres,
    // isLoading,
    // error,
    onChangeFilmName,
    onSelectFilmGenre,
    onSelectCinema,
  } = useFilmFilterActions();

  return (
    <div className={cn(styles.filmFilter, className)}>
      <FilterTitle title="Фильтр поиска" />
      <Label title="Название">
        <Input placeholder="Введите название" onChange={onChangeFilmName} />
      </Label>
      <Label title="Жанр">
        <Dropdown
          options={genres.map((genre) => ({ value: GenreToText[genre] }))}
          onSelected={onSelectFilmGenre}
          placeholder="Выберите жанр"
        />
      </Label>
      <Label title="Кинотеатр">
        <Dropdown
          options={cinemas.map((cinema) => ({ value: cinema.name }))}
          onSelected={onSelectCinema}
          placeholder="Выберите кинотеатр"
          // isDisabled={isLoading || error}
        />
      </Label>
    </div>
  );
};

export default FilmFilter;
