
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
      <Search className="absolute left-3 top-3 h-4 w-4 text-green-600" />
      <Input
        placeholder="Search deliveries..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 bg-white border-green-200 text-green-800 placeholder-green-400 focus:border-green-400 transition-colors"
      />
    </div>
  );
};
