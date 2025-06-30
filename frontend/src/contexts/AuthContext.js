import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    const { data } = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}