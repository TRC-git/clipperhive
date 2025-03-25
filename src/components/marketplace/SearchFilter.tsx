
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface SearchFilterProps {
  placeholder: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ placeholder }) => {
  return (
    <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between">
      <div className="relative flex-grow max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-charcoal-400" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-charcoal-600 focus:outline-none focus:ring-2 focus:ring-honey-500 dark:bg-charcoal-800 dark:text-white"
        />
      </div>
      <Button variant="outline" className="flex items-center">
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
    </div>
  );
};

export default SearchFilter;
