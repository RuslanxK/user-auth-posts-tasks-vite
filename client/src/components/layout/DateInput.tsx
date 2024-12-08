import React from 'react';
import { useFilterContext } from '../../contexts/filtersContext';

const DateInput: React.FC = () => {
  const { filters, setFilters } = useFilterContext();
  return (
    <>
    <label htmlFor="date-filter">Filter by Date</label>
    <input
      type="date"
      value={filters.date}
      onChange={(e) => setFilters({ ...filters, date: e.target.value })}
      className="border p-5 w-full mb-4 mt-2"
      data-testid="date-input"
    />
    </>
  );
};

export default DateInput;
