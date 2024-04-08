import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";

import { reply } from "@/pages/api/utils";
import { cinemas } from "@/pages/api/mock";
type ResponseData = {
  message: string;
};

const cache = {};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { movieId, page } = req.query;

  let text;
  const cur = Number(page)
  if (!cache[cur]) {
    console.log('mis')
    cache[cur] = await fs.readFile(`./books/${page}.txt`, "utf8");
  } else {
    console.log('mis')
    text = cache[cur];
  }

  let text2;
  const nextPage = Number(page)+ 1;
  if (!cache[nextPage]) {
    cache[nextPage] = await fs.readFile(`./books/${nextPage}.txt`, "utf8");
  } else {
    text2 = cache[nextPage];
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
