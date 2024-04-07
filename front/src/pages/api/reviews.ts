import type { NextApiRequest, NextApiResponse } from "next";

import { Entity, getById, reply } from "@/pages/api/utils";
import { movies, reviews, ReviewType } from "@/pages/api/mock";
import { Film } from "@/api";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { movieId } = req.query;

  let result: ReviewType[] = reviews;

  if (movieId) {
    const movie = getById(movies)(movieId as string) as Film;
    if (movie) {
      result = movie.reviewIds.map(
        (id) => getById(result as Entity[])(id) as ReviewType,
      );
    }
  }

  reply(res, result);
}
