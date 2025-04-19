
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
      <Input
        placeholder="Search deliveries..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9 bg-era-background/10 border-[#8B5CF6] text-white placeholder-white/50 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]"
      />
    </div>
  );
};

export default SearchBar;
