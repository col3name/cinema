import { FilmFilter } from "@/redux/features/filmFilter/filterSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export const useFilmFilter = (): FilmFilter =>
  useAppSelector((state: RootState) => state.filter);
