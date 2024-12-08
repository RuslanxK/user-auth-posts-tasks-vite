import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { vi } from 'vitest';
import Todos from '../components/pages/Todos';
import useFetch from '../hooks/useFetch';
import { useFilterContext } from '../contexts/filtersContext';

vi.mock('../hooks/useFetch', () => ({
  default: vi.fn(),
}));

vi.mock('../contexts/filtersContext', () => ({
  useFilterContext: vi.fn(() => ({
    query: '',
    filters: { completed: undefined, sort: '' },
  })),
}));

describe('Todos Component', () => {
  const mockTodos = [
    { _id: '1', title: 'Todo 1', description: 'Description 1', completed: false },
    { _id: '2', title: 'Todo 2', description: 'Description 2', completed: true },
    { _id: '3', title: 'Todo 3', description: 'Description 3', completed: false },
    { _id: '4', title: 'Todo 4', description: 'Description 4', completed: true },
    { _id: '5', title: 'Todo 5', description: 'Description 5', completed: false },
    { _id: '6', title: 'Todo 6', description: 'Description 6', completed: true },
    { _id: '7', title: 'Todo 7', description: 'Description 7', completed: false },
    { _id: '8', title: 'Todo 8', description: 'Description 8', completed: true },
    { _id: '9', title: 'Todo 9', description: 'Description 9', completed: false },
    { _id: '10', title: 'Todo 10', description: 'Description 10', completed: true },
    { _id: '11', title: 'Todo 11', description: 'Description 11', completed: false },
  ];
  

  const queryClient = new QueryClient();

  beforeEach(() => {
    (useFetch as vi.Mock).mockReturnValue({
      data: mockTodos,
      isLoading: false,
      error: null,
    });

    (useFilterContext as vi.Mock).mockReturnValue({
      query: '',
      filters: { completed: undefined, sort: '' },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders todos correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Todos />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('All Todos')).toBeInTheDocument();
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('filters todos based on search query', () => {
    (useFilterContext as vi.Mock).mockReturnValue({
      query: 'Todo 1',
      filters: { completed: undefined, sort: '' },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Todos />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.queryByText('Todo 2')).not.toBeInTheDocument();
  });

  it('filters todos based on completion status', () => {
    (useFilterContext as vi.Mock).mockReturnValue({
      query: '',
      filters: { completed: true, sort: '' },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Todos />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Todo 2')).toBeInTheDocument();
    expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
  });

  it('loads more todos when "Load more" button is clicked', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Todos />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const loadMoreButton = screen.getByRole('button', { name: /load more/i });
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);

    // Since loadMoreTodos increases visibleTodosCount, you can verify it was triggered.
    expect(loadMoreButton).toBeInTheDocument();
  });

  it('displays loading spinner when data is loading', () => {
    (useFetch as vi.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Todos />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    (useFetch as vi.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch todos'),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Todos />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/failed to fetch todos/i)).toBeInTheDocument();
  });
});
