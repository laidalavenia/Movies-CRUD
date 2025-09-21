import { Movie } from "@/types/movie";

const STORAGE_KEY = "movies-data";

// Initial dummy data
const initialMovies: Movie[] = [
  {
    id: "1",
    title: "Harry Potter and the Deathly Hallows: Part 2",
    director: "David Yates",
    summary:
      "Harry, Ron, and Hermione prepare for the final battle against Lord Voldemort as the fate of the wizarding world hangs in the balance.",
    genres: ["Action", "Drama"],
    imageUrl:
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p7953526_p_v8_aa.jpg",
    createdAt: "2025-08-10T12:00:00Z",
    updatedAt: "2025-08-10T12:00:00Z",
  },
  {
    id: "2",
    title: "Moana: The Princess of the Ocean",
    director: "Ron Clements & John Musker",
    summary:
      "An adventurous Polynesian teenager sets sail on a daring journey to save her island, guided by the demigod Maui and her own courage.",
    genres: ["Animation", "Drama"],
    imageUrl:
      "https://lumiere-a.akamaihd.net/v1/images/p_moana_20530_214883e3.jpeg",
    createdAt: "2025-08-10T12:00:00Z",
    updatedAt: "2025-08-10T12:00:00Z",
  },

  {
    id: "3",
    title: "The City of Gold",
    director: "Various",
    summary:
      "English Movies: Watch English Movies 2021, Latest Hollywood Movies Online | English Films",
    genres: ["Action"],
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BZTEyMjBkNzktNzEwNC00ZTY0LTgxYjYtYWEyOThjZGQ2ZDE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    createdAt: "2025-08-10T12:00:00Z",
    updatedAt: "2025-08-10T12:00:00Z",
  },
  {
    id: "4",
    title: "Jumanji",
    director: "Jake Kasdan",
    summary:
      "Welcome to The Jungle (English) Movie: Review | Release Date | Songs | Music | Images",
    genres: ["Action"],
    imageUrl:
      "https://www.sonypictures.ie/sites/ireland/files/2021-01/Jumanji-keyArt_1.jpg",
    createdAt: "2025-08-10T12:00:00Z",
    updatedAt: "2025-08-10T12:00:00Z",
  },
  {
    id: "5",
    title: "The Tracker (2019)",
    director: "Giorgio Serafini",
    summary: "Let There Be Carnage sequel delayed to September | Newsstyles",
    genres: ["Action", "Drama"],
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BYzhmYmZhMzEtYjI5My00YzBkLTk4ZjQtOTdkZTA5NWRhNDY1XkEyXkFqcGc@._V1_.jpg",
    createdAt: "2025-08-10T12:00:00Z",
    updatedAt: "2025-08-10T12:00:00Z",
  },
];

export const getMovies = (): Movie[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  // Initialize with dummy data if no data exists
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMovies));
  return initialMovies;
};

export const saveMovies = (movies: Movie[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  }
};

export const addMovie = (
  movie: Omit<Movie, "id" | "createdAt" | "updatedAt">
): Movie => {
  const currentDate = new Date().toISOString();
  const newMovie: Movie = {
    ...movie,
    id: Date.now().toString(),
    createdAt: currentDate,
    updatedAt: currentDate,
  };

  const movies = getMovies();
  movies.push(newMovie);
  saveMovies(movies);

  return newMovie;
};

export const updateMovie = (
  id: string,
  movie: Omit<Movie, "id" | "createdAt" | "updatedAt">
): Movie | null => {
  const movies = getMovies();
  const index = movies.findIndex((m) => m.id === id);

  if (index === -1) return null;

  const currentDate = new Date().toISOString();
  const updatedMovie: Movie = {
    ...movie,
    id,
    createdAt: movies[index].createdAt, // original creation date
    updatedAt: currentDate, // Update with current date
  };
  movies[index] = updatedMovie;
  saveMovies(movies);

  return updatedMovie;
};

export const deleteMovie = (id: string): boolean => {
  const movies = getMovies();
  const filteredMovies = movies.filter((m) => m.id !== id);

  if (filteredMovies.length === movies.length) return false;

  saveMovies(filteredMovies);
  return true;
};
