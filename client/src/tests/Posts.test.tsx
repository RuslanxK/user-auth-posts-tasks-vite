import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { vi } from 'vitest';
import Posts from '../components/pages/Posts';
import { useAuth } from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';
import useAdd from '../hooks/useAdd';
import { useFilterContext } from '../contexts/filtersContext';
import { useFormContext } from '../contexts/formContext';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../hooks/useFetch', () => ({
  default: vi.fn(),
}));

vi.mock('../hooks/useAdd', () => ({
  default: vi.fn(),
}));

vi.mock('../contexts/filtersContext', () => ({
  useFilterContext: vi.fn(() => ({
    query: '',
    filters: { date: null, sort: 'name' },
  })),
}));

vi.mock('../contexts/formContext', () => ({
  useFormContext: vi.fn(),
}));

describe('Posts Component', () => {
  const mockPosts = [
    {
      _id: '1',
      title: 'Post 1',
      description: 'Description 1',
      createdAt: '2023-12-01T00:00:00Z',
    },
    {
      _id: '2',
      title: 'Post 2',
      description: 'Description 2',
      createdAt: '2023-12-02T00:00:00Z',
    },
  ];

  const mockAddPost = vi.fn();
  const mockSetTitle = vi.fn();
  const mockSetDescription = vi.fn();

  const queryClient = new QueryClient();

  beforeEach(() => {
    document.body.innerHTML = '<div id="modal-root"></div>'; // Ensure modal-root exists

    (useAuth as vi.Mock).mockReturnValue({
      token: 'mock-token',
    });

    (useFetch as vi.Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
      error: null,
    });

    (useAdd as vi.Mock).mockReturnValue({
      mutate: mockAddPost,
      isLoading: false,
    });

    (useFilterContext as vi.Mock).mockReturnValue({
      query: '',
      filters: { date: null, sort: 'name' },
    });

    (useFormContext as vi.Mock).mockReturnValue({
      title: '',
      setTitle: mockSetTitle,
      description: '',
      setDescription: mockSetDescription,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders posts correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Posts />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('All Posts')).toBeInTheDocument();
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  it('opens the modal to add a new post', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Posts />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const addPostButton = screen.getByLabelText(/add post/i);

    fireEvent.click(addPostButton);
    expect(mockSetTitle).toHaveBeenCalledWith('');
    expect(mockSetDescription).toHaveBeenCalledWith('');

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

 
});
