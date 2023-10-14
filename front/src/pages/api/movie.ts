import type { NextApiRequest, NextApiResponse } from 'next';

import {getById, reply} from '@/pages/api/utils';
import {movies} from '@/pages/api/mock';
import {Film} from "@/api/api";

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { movieId } = req.query;
  let result: Film|undefined = undefined;

  if (movieId) {
    result = getById(movies)(movieId as string) as Film|undefined;
  }
  if (!result) {
    reply(res, {}, 1000, 404);
    return
  }
  reply(res, result, 1000, 404);
}