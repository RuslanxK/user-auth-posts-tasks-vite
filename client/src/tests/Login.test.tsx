import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Mock routing context
import { QueryClient, QueryClientProvider } from 'react-query'; // Provide react-query context
import { AuthProvider } from '../contexts/AuthProvider'; // Mock AuthProvider
import Login from '../components/pages/Login';

// Helper function to wrap components in providers
const renderWithProviders = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter>{ui}</MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

describe('Login Component', () => {
  test('renders login form with email, password, and login button', () => {
    renderWithProviders(<Login />);

    // Check for email input
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();

    // Check for password input
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();

    // Check for login button
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('displays error message when login fails', async () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Enter invalid credentials
    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    // Mock error response and check for error message
    await screen.findByText(/User not found/i);
  });

  test('disables login button when submitting', async () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Enter credentials
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(loginButton);

    // Ensure the button is disabled during loading
    await waitFor(() => expect(loginButton).toBeDisabled());
    
  });
});
