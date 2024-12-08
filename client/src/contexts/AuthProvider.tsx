import React, { useState, ReactNode, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  exp: number; 
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string>(Cookies.get('email') || '');
  const [token, setToken] = useState<string>(Cookies.get('token') || '');
  const [username, setUsername] = useState<string>(Cookies.get('username') || '');

  const setAuth = (userEmail: string, userToken: string, userUsername: string) => {
    setEmail(userEmail);
    setToken(userToken);
    setUsername(userUsername);

    const oneDayFromNow = 1; 

    Cookies.set('email', userEmail, { expires: oneDayFromNow });
    Cookies.set('token', userToken, { expires: oneDayFromNow });
    Cookies.set('username', userUsername, { expires: oneDayFromNow });
  };

  const logout = useCallback(() => {
    setEmail('');
    setToken('');
    setUsername('');

    // Remove cookies
    Cookies.remove('email');
    Cookies.remove('token');
    Cookies.remove('username');
  }, []);


  return (
    <AuthContext.Provider value={{ email, username, token, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
