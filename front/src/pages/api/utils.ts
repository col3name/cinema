import { NextApiResponse } from "next";

export const reply = (
  res: NextApiResponse,
  body: object,
  timeout: number = 1000,
  status: number = 200,
) =>
  setTimeout(() => {
    res.status(status).json(body);
  }, timeout);

export type Entity = { id: string };
export const getById =
  (entities: Entity[]) =>
  (id: string): Entity | undefined =>
    entities?.find((entity) => entity?.id === id);
