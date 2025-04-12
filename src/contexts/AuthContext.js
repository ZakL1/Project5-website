import { createContext, useContext, useState, useEffect } from "react";
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
};