import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import  React from "react";


const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(() => {
    if (!user) return [];
    const stored = localStorage.getItem(`favorites_${user.username}`);
    return stored ? JSON.parse(stored) : [];
  });

  // Update favorites when user changes
  React.useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`favorites_${user.username}`);
      setFavorites(stored ? JSON.parse(stored) : []);
    } else {
      setFavorites([]);
    }
    setError("");
  }, [user]);

  const addFavorite = (countryCode) => {
    if (!user) {
      setError("You should log in first");
      return;
    }
    if (!favorites.includes(countryCode)) {
      const updated = [...favorites, countryCode];
      setFavorites(updated);
      localStorage.setItem(`favorites_${user.username}` , JSON.stringify(updated));
    }
  };

  const removeFavorite = (countryCode) => {
    if (!user) {
      setError("You should log in first");
      return;
    }
    const updated = favorites.filter(code => code !== countryCode);
    setFavorites(updated);
    localStorage.setItem(`favorites_${user.username}`, JSON.stringify(updated));
  };

  const isFavorite = (countryCode) => favorites.includes(countryCode);

  const clearError = () => setError("");

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, error, clearError }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);