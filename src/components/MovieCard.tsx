"use client";

import { useState } from "react";

import { Edit, Trash2, Star, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types/movie";
import { formatDate } from "@/utils/dateUtils";

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
}

export default function MovieCard({ movie, onEdit, onDelete }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="bg-gray-900/50 border-gray-800 overflow-hidden group hover:scale-105 transition-transform duration-200">
      {/* Movie Poster */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 h-64 flex items-center justify-center overflow-hidden">
        {movie.imageUrl && !imageError ? (
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-600">
            <ImageIcon className="w-12 h-12 mb-2" />
            <span className="text-sm">No Image</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold flex items-center z-10">
          <Star className="w-3 h-3 mr-1 fill-current" />
          4.5
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(movie)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2"
          >
            <Edit className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(movie.id)}
            className="bg-red-600 hover:bg-red-700 text-white p-2"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">
          {movie.title}
        </h3>

        <p className="text-gray-400 text-sm mb-2">Director: {movie.director}</p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genres.map((genre, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-red-600/20 text-red-400 border-red-600/30 text-xs"
            >
              {genre}
            </Badge>
          ))}
        </div>

        {/* Summary */}
        <p className="text-gray-300 text-sm line-clamp-3 mb-2">
          {movie.summary}
        </p>

        {/* Dates */}
        <div className="text-gray-500 text-xs space-y-1">
          <p>Added: {formatDate(movie.createdAt)}</p>
          {movie.createdAt !== movie.updatedAt && (
            <p>Updated: {formatDate(movie.updatedAt)}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
