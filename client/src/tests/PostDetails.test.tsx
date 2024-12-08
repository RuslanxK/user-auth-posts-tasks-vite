import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import PostDetails from '../components/pages/PostDetails';
import { useAuth } from '../contexts/AuthContext';
import useFetch from '../hooks/useFetch';
import '@testing-library/jest-dom';

// Mock dependencies
vi.mock('../contexts/AuthContext');
vi.mock('../hooks/useFetch');

const mockUseFetch = useFetch as unknown as vi.Mock;
const mockUseAuth = useAuth as unknown as vi.Mock;

describe('PostDetails Component', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      token: 'mock-token',
    });
  });

  it('renders loading state', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Routes>
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error message', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      error: new Error('Failed to fetch post'),
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Routes>
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/failed to fetch post/i)).toBeInTheDocument();
  });

  it('renders "No post found" if no post data is returned', () => {
    mockUseFetch.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Routes>
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/no post found/i)).toBeInTheDocument();
  });

  it('renders post details correctly', () => {
    const mockPost = {
      _id: '1',
      title: 'Test Post Title',
      description: 'Test Post Description',
      createdAt: '2023-12-01',
    };
    

    mockUseFetch.mockReturnValue({
      data: mockPost,
      error: null,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/post/1']}>
        <Routes>
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/test post title/i)).toBeInTheDocument();
    expect(screen.getByText(/test post description/i)).toBeInTheDocument();
    expect(screen.getByText(/created on: \d{1,2}\/\d{1,2}\/\d{4}/i)).toBeInTheDocument();
  });
});
