// src/pages/ErrorPage.jsx
import { Link } from "react-router"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FaArrowLeft } from "react-icons/fa"

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-6 text-center">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-red-500 text-6xl mb-4"
      >
        🚫
      </motion.div>

      {/* 404 Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-red-600"
      >
        404 - Page Not Found
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mt-4 max-w-md"
      >
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8"
      >
        <Link to="/">
          <Button className="bg-primary text-white hover:bg-emerald-600 cursor-pointer flex items-center gap-2">
            <FaArrowLeft />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

export default ErrorPage
