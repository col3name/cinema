import type { NextApiRequest, NextApiResponse } from 'next';

import {Entity, getById, reply} from '@/pages/api/utils';
import {cinemas, movies} from '@/pages/api/mock';
import {Cinema} from "@/redux/features/film/model";
import {Film} from "@/api/api";

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { cinemaId } = req.query;
  let result = movies;

  if (cinemaId) {
    const cinema = getById(cinemas)(cinemaId as string) as Cinema|undefined;

    if (cinema) {
      result = cinema.movieIds.map(id => getById(result as Entity[])(id as string) as Film);
    }
  }

  reply(res, result);
}