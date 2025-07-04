"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

// ✅ Create context
export const AuthContext = createContext();

// ✅ AuthProvider component
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Load user from localStorage on mount (if needed)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setCurrentUser(user);
  }, []);

  // ✅ Login function (example)
  const login = async (email, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    if (res.status === 200) {
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }
      localStorage.setItem("user", JSON.stringify(res.data));
      setCurrentUser(res.data);
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
