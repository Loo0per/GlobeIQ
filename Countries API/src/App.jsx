import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavouriteContext";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import CountryDetails from "./components/CountryDetails";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./utils/ScrollToTop";
import LandingPage from "./pages/LandingPage";

import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        
        <Routes location={location}>
        <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/country/:code" element={<CountryDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <ScrollToTop />
          
            <Navbar />
            <AnimatedRoutes />
          
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;