import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../assets/logo.png';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Hide Navbar on landing page
  if (location.pathname === "/" || location.pathname === "/landing") {
    return null;
  }

  // Animation variants
  const navVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    },
    exit: { y: -100, opacity: 0 }
  };

  const listVariants = {
    open: {
      clipPath: "inset(0% 0% 0% 0% round 10px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.3,
        staggerChildren: 0.05
      }
    },
    closed: {
      clipPath: "inset(10% 50% 90% 50% round 10px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg shadow-lg"
          : "bg-gradient-to-r from-blue-600/90 to-blue-900/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 flex-wrap">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full ${
                  scrolled ? "bg-gradient-to-r from-blue-500 to-teal-400" : "bg-white"
                } opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
              ></div>
              <span className="text-2xl relative z-10">
              <img 
  src={logo} 
  alt="Logo" 
  className="w-10 h-10 object-cover rounded-full shadow-md border border-gray-200 z-10" 
/>
              </span>
            </div>
            <span
              className={`text-lg sm:text-xl font-bold ${
                scrolled ? "text-white" : "text-white"
              } group-hover:text-blue-200 transition-colors duration-300`}
            >
              GlobeIQ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-wrap space-x-1 mt-2 md:mt-0">
            <NavLink to="/home" scrolled={scrolled}>
              Home
            </NavLink>
            <NavLink to="/favorites" scrolled={scrolled}>
              Favorites
            </NavLink>
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`${
                    scrolled ? "text-blue-200" : "text-blue-200"
                  } text-sm font-medium px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-sm`}
                >
                  Hello, {user.name}
                </motion.span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className={`relative overflow-hidden ${
                    scrolled
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-white text-blue-700 hover:bg-blue-50"
                  } transition-colors duration-300 px-4 py-2 rounded-md text-sm font-medium`}
                >
                  <span className="relative z-10">Logout</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-teal-50 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className={`relative overflow-hidden ${
                    scrolled
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : "bg-white text-blue-700 hover:bg-blue-50"
                  } transition-colors duration-300 px-4 py-2 rounded-md text-sm font-medium`}
                >
                  <span className="relative z-10">Login</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-100 to-teal-50 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${
                scrolled ? "text-white" : "text-white"
              } p-2 rounded-md hover:bg-blue-800/50 focus:outline-none transition-colors duration-300`}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 flex flex-col justify-around">
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className={`block h-0.5 ${scrolled ? "bg-white" : "bg-white"} transform transition duration-300`}
                ></motion.span>
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className={`block h-0.5 ${scrolled ? "bg-white" : "bg-white"} transform transition duration-300`}
                ></motion.span>
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className={`block h-0.5 ${scrolled ? "bg-white" : "bg-white"} transform transition duration-300`}
                ></motion.span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <motion.div
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 pt-4 pb-6 space-y-2 bg-blue-900/90 backdrop-blur-md rounded-b-lg"
            >
              <MobileNavLink to="/home" onClick={() => setMobileMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/favorites" onClick={() => setMobileMenuOpen(false)}>
                Favorites
              </MobileNavLink>
              {user ? (
                <>
                  <div className="px-3 py-2 rounded-md text-center text-blue-200 text-sm font-medium">
                    Hello, {user.name}
                  </div>
                  <motion.button
                    variants={itemVariants}
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center block px-3 py-2 rounded-md text-base font-medium bg-white text-blue-700 hover:bg-blue-50"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <MobileNavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </MobileNavLink>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ to, scrolled, children }) {
  return (
    <Link
      to={to}
      className={`${
        scrolled
          ? "text-white hover:text-blue-300"
          : "text-white hover:text-blue-300"
      } px-3 py-2 rounded-md text-sm font-medium`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block text-white text-base font-medium py-2 px-3 rounded-md hover:bg-blue-800/30"
    >
      {children}
    </Link>
  );
}

export default Navbar;
