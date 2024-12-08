import React, { useMemo, useState } from 'react';
import { FiltersContext, FiltersContextType } from './filtersContext';

interface FiltersProviderProps {}

export const FiltersProvider: React.FC<React.PropsWithChildren<FiltersProviderProps>> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FiltersContextType['filters']>({
    sort: '',
    date: '',
    completed: '',
  });

  const value = useMemo(() => ({
    query,
    setQuery,
    filters,
    setFilters,
  }), [query, filters]);

  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  );
};
