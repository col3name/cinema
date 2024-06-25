"use client";

import React, {lazy} from "react";
import Image from "next/image";

import Title from "@/components/Common/Tite";
import Paragraph from "@/components/Common/Paragraph";
import FilmDescriptionItem from "./FilmDescriptionItem";
import FilmActionsWrapper from "@/components/Film/FilmDetails/FilmActionsWrapper";
import DataHOC from "@/components/Common/DataHOC/DataHOC";

import styles from "./stylesFilmDetail.module.css";

import {Film} from "@/api";
import {GenreToText} from "@/shared/lib/translator";
import {useFetchMovie, useFindFilmSelector,} from "@/redux/features/film/hooks";
import {Skeleton} from "@/components/Common/Skeleton";

const BookEditor = lazy(() => import('./BookEditor'));

export type FilmCardPropsType = {
    filmId: string;
};

interface FilmDataProps {
    film: Film;
    onReadBook: (filmId: string) => void;
}

const FilmData: React.FC<FilmDataProps> = ({
                                               film,
                                               // onReadBook,
                                           }: FilmDataProps) => {
    return (
        <div className={styles.filmDetailsContainer}>
            <div className={styles.filmContainer}>
                <Image
                    className={styles.filmPoster}
                    src={film?.posterUrl}
                    alt="film poster"
                    width={320}
                    height={240}
                />
                <div className={styles.filmContent}>
                    <div className={styles.filmHeader}>
                        <Title text={film.title}/>
                        <FilmActionsWrapper film={film}/>
                    </div>
                    <FilmDescriptionItem
                        title="Жанр: "
                        description={GenreToText[film.genre]}
                    />
                    <FilmDescriptionItem
                        title="Год выпуска: "
                        description={film.releaseYear}
                    />
                    <FilmDescriptionItem title="Рейтинг: " description={film.rating}/>
                    <FilmDescriptionItem title="Режиссер: " description={film.director}/>
                    <FilmDescriptionItem title="Описание: "/>
                    <Paragraph text={film.description}/>
                    {/*<Button onClick={() => onReadBook(film.id)}>Read</Button>*/}
                </div>
            </div>
        </div>
    );
};

const FilmSkeleton = () => {
    return (
        <div className={styles.filmDetailsContainer}>
            <div className={styles.filmContainer}>
                <Skeleton width={333} height={500}/>
                <div className={styles.filmContent}>
                    <div className={styles.filmHeader}>
                        <Skeleton width={400} height={32}/>
                    </div>
                    <Skeleton width={150} height={25}/>
                    <Skeleton width={200} height={25}/>
                    <Skeleton width={120} height={25}/>
                    <Skeleton width={290} height={25}/>
                    <Skeleton width={"70vw"} height={200} />
                </div>
            </div>
        </div>
    );
};

const FilmDetails: React.FC<FilmCardPropsType> = ({filmId}) => {
    const film = useFindFilmSelector(filmId) as Film;
    // const [isEditor, setIsEditor] = useState<boolean>(false);
    const {isLoading, error} = useFetchMovie(filmId);
    // const {error} = useFetchMovie(filmId);const isLoading = true;

    return (
      <DataHOC
          data={film}
          isLoading={isLoading}
          loaderText="movie"
          error={error}
          loaderComponent={FilmSkeleton}
      >
        <FilmData
          film={film}
          onReadBook={(_: string) => {
            // setIsEditor(true);
          }}
        />
      </DataHOC>
    );
};

export default FilmDetails;
