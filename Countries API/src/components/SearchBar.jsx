import { useState } from "react"
import { motion } from "framer-motion"
import React from "react"

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("")

  const handleChange = (e) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        <div className="relative flex items-center bg-blue-900/60 backdrop-blur-sm border border-blue-700/50 rounded-lg overflow-hidden">
          <div className="flex items-center justify-center h-full px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for a country..."
            value={query}
            onChange={handleChange}
            className="w-full py-4 px-2 bg-transparent text-white placeholder-blue-300 focus:outline-none"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default SearchBar