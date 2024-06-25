import React from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

import FilmActions from "@/components/Film/FilmActions";

import styles from "./stylesFilmDetails.module.css";

import { FilmInfoPropsType } from "@/shared/types";
import { Film } from "@/api";
import { GenreToText } from "@/shared/lib/translator";
import {Skeleton} from "@/shared/ui/Skeleton";
import {FilmActionsSkeleton} from "@/components/Film/FilmActions/FilmActions";

export const FilmInfoSkeleton = () => {
    return (
        <div className={styles.filmInfo}>
            <Skeleton width={100} height={120}/>
            <div className={styles.filmContent}>
                <div className={styles.filmContentLeft}>
                    <Skeleton width={400} height={29}/>
                    <Skeleton width={80} height={19}/>
                </div>
                <FilmActionsSkeleton/>
            </div>
        </div>
    )
};

import { FilmGenre } from "@/api";

type FilmGenreProps = {
    genre: FilmGenre
}
const FilmGenre: React.FC<FilmGenreProps> = ({
    genre
}) => {
    return (<p>{GenreToText[genre]}</p>)
}
const FilmInfo: React.FC<FilmInfoPropsType> = ({
  className,
  film,
  enableRemove = false,
}) => {
  return (
    <div className={cn(styles.filmInfo, className)}>
      <Image
        className={styles.filmInfoSmallPoster}
        src={film?.posterUrl}
        alt="film poster"
        width={100}
        height={120}
      />
      <div className={styles.filmContent}>
        <div>
          <Link href={`/film/${film?.id}`}>
            <h2>{film?.title}</h2>
          </Link>
            <FilmGenre genre={film?.genre}/>
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
