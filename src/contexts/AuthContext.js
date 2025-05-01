import api from "../api/axiosDefaults";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (token && !currentUser) {
      api.get('/dj-rest-auth/user/')
        .then(res => setCurrentUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        });
    }
  }, [token, currentUser]);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setCurrentUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, currentUser, setCurrentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);