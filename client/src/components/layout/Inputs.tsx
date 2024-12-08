import React from 'react';
import { useFormContext } from '../../contexts/formContext';

export const TitleInput: React.FC = () => {
  const { title, setTitle } = useFormContext();

  return (
    <div className="mb-4">
      <label htmlFor="title-input" className="block text-sm font-medium text-gray-700 mt-5">Title</label>
      <input
        type="text"
        aria-label="Title"
        id="title-input"
        value={title || ''}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a title"
        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export const DescriptionInput: React.FC = () => {
  const { description, setDescription } = useFormContext();

  return (
    <div className="mb-4">
      <label htmlFor="description-input" className="block text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        value={description || ''}
        id="description-input"
        aria-label="description" // Ensure this matches the test query
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter a description"
        rows={4}
        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};