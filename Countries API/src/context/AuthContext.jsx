import { createContext, useContext, useState } from "react";
import React from 'react';

const AuthContext = createContext();

const mockUsers = [
  { username: "test", name: "Test User", password: "test123" },
  { username: "demo", name: "Demo User", password: "demo123" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (username, password) => {
    const found = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      const { password, ...userData } = found;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);