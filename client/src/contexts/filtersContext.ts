import { createContext, useContext } from 'react';

export type Sort = 'name' | 'date';

export interface FiltersContextType {
  query: string;
  setQuery: (query: string) => void;
  filters: {
    sort: Sort | '';
    date?: string | ''; 
    completed?: boolean | ''; 
    
  };
  setFilters: (filters: FiltersContextType['filters']) => void;
}

export const FiltersContext = createContext<FiltersContextType>({
  query: '',
  setQuery: () => null,
  filters: {
    sort: '',
    date: '',
  },
  setFilters: () => null,
});

export const useFilterContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FiltersProvider');
  }
  return context;
};
