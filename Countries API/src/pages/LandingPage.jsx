import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import bgvideo from "../assets/bgvideo.mp4"
import logo from "../assets/logo1.png"

const LandingPage = () => {
  const navigate = useNavigate()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)

  const handleNavigation = () => {
    setIsTransitioning(true)

  
    setTimeout(() => {
      navigate("/home")
    }, 800)
  }

  
  const handleVideoLoaded = () => {
    setVideoLoaded(true)
  }

  const videoSource = bgvideo

  useEffect(() => {
    const video = document.getElementById("background-video")

    if (video) {
      video.addEventListener("error", (e) => {
        console.error("Video error:", e)
      })

      // Force video to load
      video.load()
    }

    return () => {
      if (video) {
        video.removeEventListener("error", () => {})
      }
    }
  }, [])

  
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.6 },
    },
  }

  const childVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }


  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {!videoLoaded && (
        <div className="absolute inset-0 bg-blue-950 flex items-center justify-center z-10">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <video
        id="background-video"
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleVideoLoaded}
        className="absolute w-full h-full object-cover"
      >
        {videoSource && <source src={videoSource} type="video/mp4" />}
        Your browser does not support the video formats provided.
      </video>

      {/* Enhanced overlay with more depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/70 to-indigo-900/80"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80"></div>

      {/* Animated particles/stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div variants={childVariants} className="absolute top-20 sm:top-32 md:top-40 flex flex-col items-center">
        <div className="relative mb-4">
  <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-30 blur-xl rounded-full"></div>

  <div className="relative w-20 h-20 sm:w-26 sm:h-26 rounded-full flex items-center justify-center shadow-xl overflow-hidden">
    <img
      src={logo} 
      alt="Logo"
      className="w-full h-full object-cover" 
    />
  </div>
</div>


          <motion.h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-wider mb-2 drop-shadow-2xl">
            <span className="inline-block relative">
              <span className="absolute -inset-1 -skew-y-3 bg-gradient-to-r from-blue-500 to-indigo-400 opacity-30 blur-xl rounded-lg"></span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200">
                GlobeIQ
              </span>
            </span>
          </motion.h1>

          <motion.p variants={childVariants} className="text-lg sm:text-xl text-blue-200 max-w-lg mx-auto mt-4 mb-8">
            Explore the world's countries with detailed information.
          </motion.p>

          <motion.div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNavigation}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-900/30 transition-all duration-300 cursor-pointer"
            >
              Start Exploring
            </motion.button>

     
          </motion.div>
        </motion.div>

      </div>

      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-20 flex items-center justify-center bg-blue-950/90 backdrop-blur-md"
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-blue-200 text-lg">Loading your adventure...</p>
          </div>
        </motion.div>
      )}

    </motion.div>
  )
}

export default LandingPage