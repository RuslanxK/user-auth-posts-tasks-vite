import React from 'react';
import { useFilterContext } from '../../contexts/filtersContext';

const SearchInput: React.FC = () => {
  const { query, setQuery } = useFilterContext();
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search by name"
      className="border p-5 w-full mb-4 mt-4"
    />
  );
};

export default SearchInput;
