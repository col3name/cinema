import React from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

import FilmActions from "@/components/Film/FilmActions";

import styles from "./stylesFilmDetails.module.css";

import { FilmInfoPropsType } from "@/shared/types";
import { Film } from "@/api";
import { GenreToText } from "@/shared/lib/translator";

const FilmInfo: React.FC<FilmInfoPropsType> = ({
  className,
  film,
  enableRemove = false,
}) => {
  return (
    <div className={cn(styles.filmInfo, className)}>
      <Image
        className={styles.filmInfoSmallPoster}
        src={film.posterUrl}
        alt="film poster"
        width={100}
        height={120}
      />
      <div className={styles.filmContent}>
        <div>
          <Link href={`/film/${film.id}`}>
            <h2>{film.title}</h2>
          </Link>
          <p>{GenreToText[film.genre]}</p>
        </div>
        {film && (
          <FilmActions
            film={film as Film}
            enableRemove={enableRemove !== undefined && enableRemove}
          />
        )}
      </div>
    </div>
  );
};

const MemoFilmInfo = React.memo(FilmInfo);
export default MemoFilmInfo;
