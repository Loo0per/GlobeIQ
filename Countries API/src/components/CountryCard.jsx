import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useFavorites } from "../context/FavouriteContext"
import React from "react"

function CountryCard({ country }) {
  const { isFavorite, addFavorite, removeFavorite, clearError } = useFavorites()
  const favorite = isFavorite(country.cca3)

  const handleFavorite = (e) => {
    e.preventDefault()
    clearError()
    favorite ? removeFavorite(country.cca3) : addFavorite(country.cca3)
  }

  return (
    <Link to={`/country/${country.cca3}`}>
      <motion.div
        whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
        className="relative group overflow-hidden h-full rounded-xl"
      >
        {/* Card background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-900/60 to-blue-950/90 opacity-90 group-hover:opacity-80 transition-opacity duration-300 z-10"></div>

        {/* Animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-0"></div>
        <div className="absolute inset-[1px] bg-blue-950 rounded-xl z-[1]"></div>

        <div className="relative z-20 flex flex-col h-full">
          <div className="aspect-w-3 aspect-h-2 overflow-hidden">
            {country.flags?.svg && country.flags.svg !== "" && (
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            )}
          </div>
          <div className="p-6 flex-grow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-blue-100 group-hover:text-white transition-colors duration-300">
                {country.name.common}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFavorite}
                className={`p-2 rounded-full ${
                  favorite
                    ? "text-yellow-400 bg-blue-900/80"
                    : "text-blue-400 hover:text-yellow-400 bg-blue-900/60 hover:bg-blue-800/80"
                } transition-colors duration-200 backdrop-blur-sm`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={favorite ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </motion.button>
            </div>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-blue-400">Capital</dt>
                <dd className="text-blue-100">{country.capital?.[0] || "N/A"}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-blue-400">Region</dt>
                <dd className="text-blue-100">{country.region}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-blue-400">Population</dt>
                <dd className="text-blue-100">{country.population.toLocaleString()}</dd>
              </div>
            </dl>

            {/* View details button that appears on hover */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="mt-4 absolute bottom-4 left-4 right-4"
            >
              <div className="py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg text-center">
                View Details
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default CountryCard