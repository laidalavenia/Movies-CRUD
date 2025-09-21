"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Movie, Genre, GENRES } from "@/types/movie";
import { formatDateTime } from "@/utils/dateUtils";

interface MovieFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (movie: Omit<Movie, "id" | "createdAt" | "updatedAt">) => void;
  editMovie?: Movie | null;
}

export default function MovieForm({
  isOpen,
  onClose,
  onSubmit,
  editMovie,
}: MovieFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    summary: "",
    imageUrl: "",
    genres: [] as Genre[],
  });
  const [imagePreviewError, setImagePreviewError] = useState(false);

  useEffect(() => {
    if (editMovie) {
      setFormData({
        title: editMovie.title,
        director: editMovie.director,
        summary: editMovie.summary,
        imageUrl: editMovie.imageUrl || "",
        genres: editMovie.genres,
      });
    } else {
      setFormData({
        title: "",
        director: "",
        summary: "",
        imageUrl: "",
        genres: [],
      });
    }
  }, [editMovie, isOpen]);

  const handleGenreToggle = (genre: Genre) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.director.trim()) return;

    onSubmit(formData);
    onClose();
  };

  const remainingChars = 100 - formData.summary.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {editMovie ? "Edit Movie" : "Add New Movie"}
          </DialogTitle>
          {editMovie && (
            <div className="text-sm text-gray-400 space-y-1">
              <p className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Created: {formatDateTime(editMovie.createdAt)}
              </p>
              {editMovie.createdAt !== editMovie.updatedAt && (
                <p className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Last updated: {formatDateTime(editMovie.updatedAt)}
                </p>
              )}
            </div>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="bg-gray-800 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
              placeholder="Enter movie title"
              required
            />
          </div>

          {/* Director */}
          <div>
            <label className="block text-sm font-medium mb-2">Director *</label>
            <Input
              type="text"
              value={formData.director}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, director: e.target.value }))
              }
              className="bg-gray-800 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
              placeholder="Enter director name"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <ImageIcon className="w-4 h-4 inline mr-1" />
              Image URL
            </label>
            <Input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, imageUrl: e.target.value }));
                setImagePreviewError(false); // Reset error when URL changes
              }}
              className="bg-gray-800 border-gray-700 text-white focus:ring-red-500 focus:border-red-500"
              placeholder="https://example.com/movie-poster.jpg"
            />
            <p className="text-xs text-gray-400 mt-1">
              Enter a valid image URL for the movie poster (optional)
            </p>

            {/* Image Preview */}
            {formData.imageUrl && (
              <div className="mt-3">
                <p className="text-sm text-gray-400 mb-2">Preview:</p>
                <div className="w-32 h-48 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                  {!imagePreviewError ? (
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={() => setImagePreviewError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                      <ImageIcon className="w-8 h-8 mb-2" />
                      <span className="text-xs text-center px-2">
                        Invalid Image URL
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Summary
              <span
                className={`ml-2 text-xs ${
                  remainingChars < 0 ? "text-red-500" : "text-gray-400"
                }`}
              >
                ({remainingChars} characters remaining)
              </span>
            </label>
            <Textarea
              value={formData.summary}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setFormData((prev) => ({ ...prev, summary: e.target.value }));
                }
              }}
              className="bg-gray-800 border-gray-700 text-white focus:ring-red-500 focus:border-red-500 resize-none"
              placeholder="Enter movie summary (max 100 characters)"
              rows={3}
            />
          </div>

          {/* Genres */}
          <div>
            <label className="block text-sm font-medium mb-2">Genres</label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => (
                <Badge
                  key={genre}
                  variant={
                    formData.genres.includes(genre) ? "default" : "outline"
                  }
                  className={`cursor-pointer transition-colors ${
                    formData.genres.includes(genre)
                      ? "bg-red-600 text-white border-red-600"
                      : "border-gray-600 text-gray-300 hover:border-red-500"
                  }`}
                  onClick={() => handleGenreToggle(genre)}
                >
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              disabled={!formData.title.trim() || !formData.director.trim()}
            >
              {editMovie ? "Update" : "Add"} Movie
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
