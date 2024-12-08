import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Homepage from '../components/pages/Homepage';
import { useAuth } from '../contexts/AuthContext';

// Mock useAuth
vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Homepage Component', () => {
  it('renders with the correct username', () => {
    // Mock useAuth to return a username
    (useAuth as vi.Mock).mockReturnValue({
      username: 'JohnDoe',
      logout: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    // Check the greeting with username
    expect(screen.getByText(/Hello, JohnDoe!/i)).toBeInTheDocument();
  });

  it('renders with "Guest" when no username is provided', () => {
    // Mock useAuth to return no username
    (useAuth as vi.Mock).mockReturnValue({
      username: '',
      logout: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    // Check the greeting with "Guest"
    expect(screen.getByText(/Hello, Guest!/i)).toBeInTheDocument();
  });

  it('navigates to /posts when "Go to Posts" is clicked', () => {
    // Mock useAuth
    (useAuth as vi.Mock).mockReturnValue({
      username: 'JohnDoe',
      logout: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    // Simulate clicking "Go to Posts"
    fireEvent.click(screen.getByText(/Go to Posts/i));

    // Check if navigate was called with /posts
    expect(mockNavigate).toHaveBeenCalledWith('/posts');
  });

  it('navigates to /todos when "Go to Todos" is clicked', () => {
    // Mock useAuth
    (useAuth as vi.Mock).mockReturnValue({
      username: 'JohnDoe',
      logout: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    // Simulate clicking "Go to Todos"
    fireEvent.click(screen.getByText(/Go to Todos/i));

    // Check if navigate was called with /todos
    expect(mockNavigate).toHaveBeenCalledWith('/todos');
  });

  it('calls logout and navigates to /login when "Logout" is clicked', () => {
    const mockLogout = vi.fn();
    // Mock useAuth with logout
    (useAuth as vi.Mock).mockReturnValue({
      username: 'JohnDoe',
      logout: mockLogout,
    });

    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );

    // Simulate clicking "Logout"
    fireEvent.click(screen.getByText(/Logout/i));

    // Check if logout was called
    expect(mockLogout).toHaveBeenCalled();

    // Check if navigate was called with /login
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
