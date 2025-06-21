import { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { motion } from "framer-motion"
import React from "react"

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
const LANGUAGES = [
  { code: "eng", name: "English" },
  { code: "fra", name: "French" },
  { code: "spa", name: "Spanish" },
  { code: "ara", name: "Arabic" },
  { code: "zho", name: "Chinese" },
  { code: "rus", name: "Russian" },
]

function FilterBar({ onRegionChange, onLanguageChange, selectedLanguage, selectedRegion }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto my-6"
    >
      <Listbox value={selectedRegion} onChange={onRegionChange}>
        <div className="relative mt-1 flex-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-blue-900/60 backdrop-blur-sm border border-blue-700/50 py-3 pl-4 pr-10 text-left text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
            <span className="block truncate">{selectedRegion ? selectedRegion : "Select Region"}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-blue-900/90 backdrop-blur-md py-1 text-base shadow-lg ring-1 ring-blue-700 focus:outline-none sm:text-sm">
              <Listbox.Option
                value=""
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                    active ? "bg-blue-800 text-blue-200" : "text-blue-300"
                  }`
                }
              >
                All Regions
              </Listbox.Option>
              {REGIONS.map((region) => (
                <Listbox.Option
                  key={region}
                  value={region}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                      active ? "bg-blue-800 text-blue-200" : "text-blue-300"
                    }`
                  }
                >
                  {region}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      <Listbox value={selectedLanguage} onChange={onLanguageChange}>
        <div className="relative mt-1 flex-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-blue-900/60 backdrop-blur-sm border border-blue-700/50 py-3 pl-4 pr-10 text-left text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
            <span className="block truncate">
              {selectedLanguage && selectedLanguage.name ? selectedLanguage.name : "Select Language"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-blue-900/90 backdrop-blur-md py-1 text-base shadow-lg ring-1 ring-blue-700 focus:outline-none sm:text-sm">
              <Listbox.Option
                value={null}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                    active ? "bg-blue-800 text-blue-200" : "text-blue-300"
                  }`
                }
              >
                All Languages
              </Listbox.Option>
              {LANGUAGES.map((language) => (
                <Listbox.Option
                  key={language.code}
                  value={language}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                      active ? "bg-blue-800 text-blue-200" : "text-blue-300"
                    }`
                  }
                >
                  {language.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </motion.div>
  )
}

export default FilterBar