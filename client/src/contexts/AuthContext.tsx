import { createContext, useContext } from 'react';

interface AuthContextType {
  email: string;
  token: string;
  username: string;
  setAuth: (email: string, token: string, username: string) => void;
  logout: () => void;
  
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
