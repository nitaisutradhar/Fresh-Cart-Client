import { motion } from "framer-motion"
import { FaLeaf } from "react-icons/fa"

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-lime-100 text-primary">
      {/* Icon with Infinite Spin */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className="text-5xl text-green-600 mb-4"
      >
        <FaLeaf />
      </motion.div>

      {/* Text with Bounce Animation */}
      <motion.h2
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "easeInOut",
        }}
        className="text-xl font-semibold tracking-wide text-green-800"
      >
        FreshCart is loading...
      </motion.h2>

      {/* Subtext fade-in */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-sm text-gray-500 mt-2"
      >
        Please wait while we bring you fresh data.
      </motion.p>
    </div>
  )
}

export default Loading
