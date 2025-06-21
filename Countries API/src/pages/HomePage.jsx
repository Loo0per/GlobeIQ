import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getAllCountries, getCountryByName, getCountriesByRegion } from "../api/countries"
import SearchBar from "../components/SearchBar"
import FilterBar from "../components/FilterBar"
import CountryList from "../components/CountryList"
import { useFavorites } from "../context/FavouriteContext"
import React from "react"

function Toast({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [message, onClose])

  if (!message) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center items-start pointer-events-none"
    >
      <div
        className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-6 py-3 rounded-md shadow-xl 
                    max-w-md w-full mx-4 pointer-events-auto
                    border border-blue-700 backdrop-blur-sm"
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <svg
              className="h-5 w-5 text-blue-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1 font-medium mr-2">{message}</div>
          <button
            onClick={onClose}
            className="ml-auto bg-blue-800 rounded-full p-1 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          >
            <svg
              className="h-4 w-4 text-blue-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function HomePage() {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState("")
  const countriesPerPage = 8
  const { error, clearError } = useFavorites()

  useEffect(() => {
    setLoading(true)
    getAllCountries()
      .then((data) => {
        setCountries(data)
        setFiltered(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const totalPages = Math.ceil(filtered.length / countriesPerPage)

  const handleSearch = async (query) => {
    setCurrentPage(1)
    if (!query) {
      setFiltered(countries)
      return
    }
    try {
      const data = await getCountryByName(query)
      setFiltered(data)
    } catch {
      setFiltered([])
    }
  }

  const handleRegionChange = async (region) => {
    setCurrentPage(1)
    setSelectedRegion(region)
    if (!region) {
      setFiltered(countries)
      return
    }
    try {
      const data = await getCountriesByRegion(region)
      setFiltered(data)
      setSelectedLanguage(null)
    } catch {
      setFiltered([])
    }
  }

  const handleLanguageChange = (langObj) => {
    setCurrentPage(1)
    setSelectedLanguage(langObj)
    if (!langObj || !langObj.code) {
      setFiltered(countries)
      return
    }
    const filteredByLang = countries.filter(
      (country) => country.languages && Object.keys(country.languages).includes(langObj.code),
    )
    setFiltered(filteredByLang)
    setSelectedRegion("")
  }

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * countriesPerPage
    const endIndex = startIndex + countriesPerPage
    return filtered.slice(startIndex, endIndex)
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

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
      <Toast message={error} onClose={clearError} />

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
              Explore Countries
            </h1>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Discover information about countries around the world
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6 max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
            <FilterBar
              onRegionChange={handleRegionChange}
              onLanguageChange={handleLanguageChange}
              selectedLanguage={selectedLanguage}
              selectedRegion={selectedRegion}
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center min-h-[400px]"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-t-4 border-b-4 border-blue-300 rounded-full animate-spin"></div>
                  <div
                    className="w-16 h-16 border-r-4 border-l-4 border-transparent border-t-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0"
                    style={{ animationDirection: "reverse", animationDuration: "1s" }}
                  ></div>
                </div>
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <p className="text-blue-300 text-lg">No countries found</p>
              </motion.div>
            ) : (
              <motion.div key="results" variants={itemVariants} className="space-y-8">
                <CountryList
                  countries={getCurrentPageData()}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  goToNextPage={goToNextPage}
                  goToPrevPage={goToPrevPage}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage
