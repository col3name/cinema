import { useAppSelector } from "@/shared/redux/hooks";

import { FilmFilter } from "@/entities/filmFilter";
import { RootState } from "@/shared/redux/store";

export const useFilmFilterSelector = (): FilmFilter =>
  useAppSelector((state: RootState) => state.filter);
