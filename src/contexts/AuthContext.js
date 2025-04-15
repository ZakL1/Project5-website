/*import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // On mount, check if user is logged in
    axios.get("http://127.0.0.1:8000/dj-rest-auth/user/")
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  const handleLogout = async () => {
    await axios.post("http://127.0.0.1:8000/dj-rest-auth/logout/");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};*/

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);