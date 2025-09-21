"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import MovieForm from "@/pages/movies/components/MovieForm";
import { Movie } from "@/types/movie";
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "@/utils/localStorage";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // Load movies on component mount
  useEffect(() => {
    const loadedMovies = getMovies();
    setMovies(loadedMovies);
    setFilteredMovies(loadedMovies);
  }, []);

  // Filter movies based on search term
  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [movies, searchTerm]);

  const handleAddMovie = () => {
    setEditingMovie(null);
    setIsFormOpen(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setIsFormOpen(true);
  };

  const handleDeleteMovie = (id: string) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      const success = deleteMovie(id);
      if (success) {
        const updatedMovies = getMovies();
        setMovies(updatedMovies);
      }
    }
  };

  const handleFormSubmit = (
    movieData: Omit<Movie, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editingMovie) {
      // Update existing movie
      const updatedMovie = updateMovie(editingMovie.id, movieData);
      if (updatedMovie) {
        const updatedMovies = getMovies();
        setMovies(updatedMovies);
      }
    } else {
      // Add new movie
      addMovie(movieData);
      const updatedMovies = getMovies();
      setMovies(updatedMovies);
    }
    setIsFormOpen(false);
    setEditingMovie(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navbar */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddMovie={handleAddMovie}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold mb-2">
            {searchTerm
              ? `Search Results for "${searchTerm}"`
              : "Newest & Recommend"}
          </h1>
          <p className="text-gray-400">
            {filteredMovies.length} movie
            {filteredMovies.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onEdit={handleEditMovie}
                onDelete={handleDeleteMovie}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-white text-xl font-bold mb-2">
              {searchTerm ? "No movies found" : "No movies yet"}
            </h3>
            <p className="text-gray-400 mb-4">
              {searchTerm
                ? `No movies match your search for "${searchTerm}"`
                : "Start by adding your first movie"}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddMovie}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Add Your First Movie
              </button>
            )}
          </div>
        )}
      </main>

      {/* Movie Form Modal */}
      <MovieForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingMovie(null);
        }}
        onSubmit={handleFormSubmit}
        editMovie={editingMovie}
      />
    </div>
  );
}
