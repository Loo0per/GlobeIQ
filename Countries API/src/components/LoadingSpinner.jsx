import { motion } from "framer-motion";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <motion.div
        className="h-12 w-12 rounded-full border-4 border-blue-200 border-t-blue-600"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default LoadingSpinner;