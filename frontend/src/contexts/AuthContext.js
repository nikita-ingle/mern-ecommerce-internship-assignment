import React, { createContext, useState, useEffect } from 'react';
import API, { setAuthToken } from '../api';

export const AuthContext = createContext();

function isTokenValid(token) {
  if (!token) return false;
  try {
    // decode payload: token = header.payload.signature
    const payload = token.split('.')[1];
    if (!payload) return false;
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    if (!json.exp) return false;
    // exp is in seconds
    return json.exp * 1000 > Date.now();
  } catch (e) {
    return false;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      const t = localStorage.getItem('token');
      return isTokenValid(t) ? t : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      localStorage.setItem('token', token);
    } else {
      setAuthToken(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    setToken(res.data.token);
    return res;
  };

  const register = async (email, password) => {
    const res = await API.post('/auth/register', { email, password });
    setToken(res.data.token);
    return res;
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
