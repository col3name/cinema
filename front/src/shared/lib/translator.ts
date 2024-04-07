import { FilmGenre } from "@/api";

export const GenreToText: Record<FilmGenre, string> = {
  "": "",
  fantasy: "Фэнтези",
  horror: "Хоррор",
  action: "Боевик",
  comedy: "Комедия",
};

export const TextToGenre: Record<string, FilmGenre> = {
  'Фэнтези': "fantasy",
  'Хоррор': "horror",
  'Боевик': "action",
  'Комедия': "comedy",
};
