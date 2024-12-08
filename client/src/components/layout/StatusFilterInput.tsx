import React from 'react';
import { useFilterContext } from '../../contexts/filtersContext';

const StatusFilterInput: React.FC = () => {
  const { filters, setFilters } = useFilterContext();

  return (
    <div className="mb-4">
      <label htmlFor="completed-filter" className="block text-sm font-medium text-gray-700">
        Filter by Status
      </label>
      <select
        id="completed-filter"
        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-5"
        value={filters.completed === undefined || filters.completed === '' ? '' : filters.completed.toString()}
        onChange={(e) =>
          setFilters({
            ...filters,
            completed: e.target.value === '' ? undefined : e.target.value === 'true',
          })
        }
      >
        <option value="">All</option>
        <option value="true">Completed</option>
        <option value="false">Not Completed</option>
      </select>
    </div>
  );
};

export default StatusFilterInput;
