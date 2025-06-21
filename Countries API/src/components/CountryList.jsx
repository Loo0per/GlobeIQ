import { motion } from "framer-motion"
import CountryCard from "./CountryCard"
import React from "react"

function CountryList({ countries, currentPage, totalPages, goToNextPage, goToPrevPage }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="w-full flex flex-col items-center relative z-0">
      <div className="w-full max-w-7xl flex justify-center relative">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`absolute -left-5 md:-left-15 top-1/2 -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full shadow-lg border ${
            currentPage === 1
              ? "border-blue-800/50 bg-blue-900/40 text-blue-700 cursor-not-allowed"
              : "border-blue-600 bg-blue-800/80 text-blue-300 hover:bg-blue-700 hover:text-white"
          } transition-all duration-300 backdrop-blur-sm z-10`}
          aria-label="Previous page"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4"
          style={{ minHeight: "60vh" }}
        >
          {countries.map((country, index) => (
            <motion.div key={country.cca3} variants={itemVariants} custom={index}>
              <CountryCard country={country} />
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`absolute -right-5 md:-right-15 top-1/2 -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full shadow-lg border ${
            currentPage === totalPages || totalPages === 0
              ? "border-blue-800/50 bg-blue-900/40 text-blue-700 cursor-not-allowed"
              : "border-blue-600 bg-blue-800/80 text-blue-300 hover:bg-blue-700 hover:text-white"
          } transition-all duration-300 backdrop-blur-sm z-10`}
          aria-label="Next page"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Page Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-blue-300 text-sm select-none bg-blue-900/40 px-4 py-2 rounded-full backdrop-blur-sm border border-blue-800/50"
      >
        Page {currentPage} of {totalPages}
      </motion.div>
    </div>
  )
}

export default CountryList