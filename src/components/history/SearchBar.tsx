
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
      <Input
        placeholder="Search deliveries..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 bg-green-600 border-neon-green text-white placeholder-white/50"
      />
    </div>
  );
};
