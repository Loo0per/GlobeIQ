import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

function LoginPage() {
  const { user, login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  if (user) {
    navigate("/home")
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = login(username, password)
    if (success) {
      navigate("/home")
    } else {
      setError("Invalid credentials. Try the demo accounts below.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 w-full">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-700 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-800 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md space-y-8"
      >
        <div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center text-3xl font-extrabold text-white"
          >
            Welcome to GlobeIQ
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-center text-sm text-blue-300"
          >
            Sign in to explore countries around the world
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-20"></div>
          <form
            className="relative bg-blue-900/60 backdrop-blur-sm mt-8 space-y-6 p-8 rounded-xl border border-blue-800/50 shadow-xl"
            onSubmit={handleSubmit}
          >
            <div className="rounded-md shadow-sm space-y-4">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 bg-blue-800/50 border border-blue-700/50 placeholder-blue-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 bg-blue-800/50 border border-blue-700/50 placeholder-blue-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center">
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Sign in
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-center"
        >
          <div className="p-4 bg-blue-900/40 backdrop-blur-sm rounded-lg border border-blue-800/50">
            <p className="text-sm text-blue-300">
              <strong className="text-blue-200">Demo credentials 1:</strong> test / test123 <br />
              <strong className="text-blue-200">Demo credentials 2:</strong> demo / demo123
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoginPage