export interface IFilmDetail {
  title: string;
  year: number;
  released: Date;
  released_digital: Date;
  description: string;
  runtime: number;
  score: number;
  score_average: number;
  imdbid: string;
  traktid: number;
  tmdbid: number;
  type: string;
  ratings: Rating[];
  streams: any[];
  watch_providers: Keyword[];
  reviews: Review[];
  keywords: Keyword[];
  language: string;
  spoken_language: string;
  country: string;
  certification: string;
  commonsense: number;
  age_rating: number;
  status: string;
  trailer: string;
  poster: string;
  backdrop: string;
  response: boolean;
  apiused: number;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface Rating {
  source: string;
  value: number | null;
  score?: number;
  votes?: number | null;
  popular?: number;
  url?: string;
  id?: null;
}

export interface Review {
  updated_at: Date | null;
  author: string;
  rating: number | null;
  provider_id: number;
  content: string;
}
