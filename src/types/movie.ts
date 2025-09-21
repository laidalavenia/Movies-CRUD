export interface Movie {
  id: string;
  title: string;
  director: string;
  summary: string;
  genres: Genre[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type Genre = "Drama" | "Action" | "Animation" | "Sci-Fi" | "Horror";

export const GENRES: Genre[] = [
  "Drama",
  "Action",
  "Animation",
  "Sci-Fi",
  "Horror",
];
