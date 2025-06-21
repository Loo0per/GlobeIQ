import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getCountryByCode } from "../api/countries"
import { useFavorites } from "../context/FavouriteContext"
import { motion } from "framer-motion"

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
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

function CountryDetails() {
  const { code } = useParams()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    setLoading(true)
    getCountryByCode(code)
      .then((data) => {
        setCountry(data[0])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [code])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900">
        <LoadingSpinner />
      </div>
    )
  }

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-blue-200">
        <h2 className="text-2xl font-bold mb-4">Country not found</h2>
        <Link to="/" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    )
  }

  const handleFavorite = () => {
    isFavorite(country.cca3) ? removeFavorite(country.cca3) : addFavorite(country.cca3)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 py-8 min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white pt-20"
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-700 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-800 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Link to="/home" className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors group">
              <svg
                className="h-5 w-5 group-hover:translate-x-[-4px] transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="relative rounded-xl overflow-visible w-full">
  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 opacity-50 group-hover:opacity-70 transition-opacity duration-300 blur-sm z-0 rounded-lg"></div>
  <img
    src={country.flags.svg || "/placeholder.svg"}
    alt={`${country.name.common} flag`}
    className="w-full h-auto rounded-lg shadow-lg relative z-10"
  />
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFavorite}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-lg backdrop-blur-sm ${
                  isFavorite(country.cca3)
                    ? "bg-yellow-500/90 text-white"
                    : "bg-blue-900/80 text-blue-300 hover:bg-yellow-500/90 hover:text-white"
                } transition-colors duration-200`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={isFavorite(country.cca3) ? "currentColor" : "none"}
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
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200 mb-2">
                {country.name.common}
              </h1>
              <p className="text-xl text-blue-300">{country.name.official}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoItem label="Capital" value={country.capital?.join(", ") || "N/A"} />
                <InfoItem label="Region" value={country.region} />
                <InfoItem label="Subregion" value={country.subregion || "N/A"} />
                <InfoItem label="Population" value={country.population.toLocaleString()} />
              </div>
              <div className="space-y-4">
                <InfoItem
                  label="Languages"
                  value={country.languages ? Object.values(country.languages).join(", ") : "N/A"}
                />
                <InfoItem
                  label="Currencies"
                  value={
                    country.currencies
                      ? Object.values(country.currencies)
                          .map((curr) => curr.name)
                          .join(", ")
                      : "N/A"
                  }
                />
                <InfoItem label="Time Zones" value={country.timezones?.join(", ") || "N/A"} />
              </div>
            </div>

            {country.maps?.googleMaps && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={country.maps.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg"
              >
                View on Google Maps
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="bg-blue-900/40 backdrop-blur-sm border border-blue-800/50 rounded-lg p-3 transition-all duration-300 hover:bg-blue-800/40">
      <dt className="text-sm font-medium text-blue-400">{label}</dt>
      <dd className="text-base text-blue-100">{value}</dd>
    </div>
  )
}

export default CountryDetails