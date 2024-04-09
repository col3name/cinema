import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";

import { reply } from "@/pages/api/utils";
type ResponseData = {
  message: string;
};

const cache = new Map<number, string>();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
): Promise<void> {
  const { movieId, page } = req.query;

  let text;
  const cur = Number(page)
  if (!cache.has(cur)) {
    console.log('mis')
    cache.set(cur, await fs.readFile(`./books/${page}.txt`, "utf8"));
  } else {
    console.log('mis')
    text = cache.get(cur);
  }

  let text2;
  const nextPage = Number(page)+ 1;
  if (!cache.has(nextPage)) {
    cache.set(nextPage, await fs.readFile(`./books/${nextPage}.txt`, "utf8"));
  } else {
    text2 = cache.get(nextPage);
  }
  const book = {
    meta: {
      movieId,
      title: "Властелин колец. Братство Кольца",
      subject: "Толкин Джон Рональд Руэл",
      author: "Толкин Джон Рональд Руэл",
    },
    page: Number(page),
    text,
    text2,
  };
//   console.log({ book });
  reply(res, book);
}
