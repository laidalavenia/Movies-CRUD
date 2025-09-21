"use client";

import { Search, Plus, Clapperboard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddMovie: () => void;
}

export default function Navbar({
  searchTerm,
  onSearchChange,
  onAddMovie,
}: NavbarProps) {
  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Clapperboard className="w-8 h-8 text-red-600" strokeWidth={2.5} />
          <span className="text-white font-bold text-xl">
            Web<span className="text-red-500">TV</span>
          </span>
        </div>
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Find Your Movies"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 pl-10 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        <Button
          onClick={onAddMovie}
          className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Movie
        </Button>
      </div>
    </nav>
  );
}
