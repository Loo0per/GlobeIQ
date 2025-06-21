import { useEffect, useState } from "react"
import { useFavorites } from "../context/FavouriteContext"
import { getCountryByCode } from "../api/countries"
import CountryList from "../components/CountryList"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-t-4 border-b-4 border-blue-300 rounded-full animate-spin"></div>
        <div
          className="w-16 h-16 border-r-4 border-l-4 border-transparent border-t-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0"
          style={{ animationDirection: "reverse", animationDuration: "1s" }}
        ></div>
      </div>
    </div>
  )
}

function FavoritesPage() {
  const { favorites } = useFavorites()
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (favorites.length === 0) {
      setCountries([])
      setLoading(false)
      return
    }
    setLoading(true)
    Promise.all(favorites.map((code) => getCountryByCode(code).then((data) => data[0])))
      .then(setCountries)
      .finally(() => setLoading(false))
  }, [favorites])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white pt-20">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-700 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-800 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200">
              Your Favorite Countries
            </h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">Manage your collection of favorite countries</p>
          </motion.div>

          {loading ? (
            <LoadingSpinner />
          ) : countries.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="text-center py-12 bg-blue-900/30 backdrop-blur-sm rounded-xl border border-blue-800/50 max-w-2xl mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-blue-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <p className="text-blue-300 text-lg mb-6">You haven't added any countries to your favorites yet</p>
              <Link
                to="/home"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300"
              >
                Explore Countries
              </Link>
            </motion.div>
          ) : (
            <motion.div variants={itemVariants}>
              <CountryList countries={countries} currentPage={1} totalPages={1} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default FavoritesPage