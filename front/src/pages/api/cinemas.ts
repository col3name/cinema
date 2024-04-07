import type { NextApiRequest, NextApiResponse } from "next";

import { reply } from "@/pages/api/utils";
import { cinemas } from "@/pages/api/mock";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  reply(res, cinemas);
}
