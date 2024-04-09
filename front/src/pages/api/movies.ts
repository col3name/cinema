import type { NextApiRequest, NextApiResponse } from "next";

import { Entity, getById, reply } from "@/pages/api/utils";
import {cinemas, Movie, movies, reviews, ReviewType} from "@/pages/api/mock";
import { Cinema } from "@/redux/features/film/model";
import { Film } from "@/api";
import { randomUUID } from "crypto";

type ResponseData = {
  message: string;
};

const DEFAULT_COUNT = 12;

const getRandomInt = (max: number, min: number = 0): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandomReviewIds(reviewIds: string[], count: number = getRandomInt(5)): string[] {
  const setIndexes = new Set<string>();
  for (let i = 0; i < count; i++) {
    const index = getRandomInt(reviewIds.length - 1);
    if (index >= reviewIds.length) {
      continue;
    }
    const id = reviewIds[index];
    if (!setIndexes.has(id)) {
      setIndexes.add(id);
    }
  }
  return Array.from(setIndexes) || [];
}

const getRandomMovie = () => movies[getRandomInt(movies.length - 2)];

const generateMovie = (reviewIds: string[]): Movie => {
  return {
    title: getRandomMovie().title,
    posterUrl: getRandomMovie().posterUrl,
    releaseYear: getRandomInt(2040, 1990),
    description: getRandomMovie().description,
    genre: getRandomMovie().genre,
    id: randomUUID().toString(),
    rating: getRandomInt(10),
    director: getRandomMovie().director,
    reviewIds: getRandomReviewIds(reviewIds),
  } as Movie;
};

const reviewIds: string[] = reviews.map((review: ReviewType) => review.id);

const addMovieToCinema = (movieId: string): void => {
  const countCinema = cinemas.length;
  Array(getRandomInt(countCinema)).forEach(() =>
    cinemas[getRandomInt(countCinema)].movieIds.push(movieId),
  );
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { cinemaId, page = 0 } = req.query;
  const pageNumber = Number(page);
  let result = movies;
  // console.log([movies.length]);
  const countPage = movies.length / DEFAULT_COUNT - 1;
  const ok = cinemaId === undefined && Number(page) > 0 && countPage < pageNumber;
  // console.log({ countPage }, page, { cinemaId }, ok);
  if (ok) {
    console.log("-----");
    for (let i = 0; i < 12; i++) {
      const movie = generateMovie(reviewIds);
      // console.log({ movie });
      addMovieToCinema(movie.id);
      movies.push(movie);
    }
  }

  if (pageNumber >= 0) {
    const list = [];
    const start = pageNumber * DEFAULT_COUNT;

    for (let i = start; i < start + DEFAULT_COUNT; i++) {
      list.push(movies[i]);
    }
    result = list;
  }

  if (cinemaId) {
    const cinema = getById(cinemas)(cinemaId as string) as Cinema | undefined;

    if (cinema) {
      result = cinema.movieIds.map(
        (id: string) => getById(result as Entity[])(id as string) as Film,
      );
    }
  }

  reply(res, result);
}
