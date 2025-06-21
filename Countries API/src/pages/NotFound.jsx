import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HomeIcon } from "@heroicons/react/24/outline";

function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-2 w-full"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-900">Page Not Found</p>
        <p className="mt-2 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6"
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default NotFound;