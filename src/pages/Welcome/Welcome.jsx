// src/pages/Welcome.jsx
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FaLeaf, FaShoppingBasket, FaArrowRight } from "react-icons/fa"
import { Link } from "react-router"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.6 },
  }),
}

const Welcome = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-emerald-50 via-white to-lime-100 text-gray-800 px-6 py-10">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12"
      >
        {/* Left: Text */}
        <div className="flex-1 space-y-6">
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-5xl font-bold text-emerald-700 leading-tight"
          >
            Welcome to <span className="text-primary">FreshCart</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-lg text-gray-600"
          >
            Track real-time prices of your favorite fresh items from your local market.
            We help you shop smarter and eat fresher every day.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex items-center gap-4">
            <Link to="/all-products">
            <motion.div  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-primary text-white hover:bg-emerald-600 flex items-center gap-2">
                <FaShoppingBasket />
                Browse Products
              </Button>
            </motion.div>
              
            </Link>
          </motion.div>
        </div>

        {/* Right: SVG Image */}
        <motion.div
          variants={fadeUp}
          custom={4}
          className="flex-1 max-w-md w-full"
        >
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/883/883407.png"
            alt="FreshCart Market"
            className="w-full drop-shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
          />
        </motion.div>
      </motion.div>

      {/* Feature Highlights */}
      <motion.div
        className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {[
          { icon: <FaLeaf />, title: "Fresh & Local", desc: "Daily updated prices from your nearby market." },
          { icon: <FaShoppingBasket />, title: "Smart Shopping", desc: "Track best deals and compare daily." },
          { icon: <FaArrowRight />, title: "Easy to Use", desc: "Simple, fast, and designed for everyone." },
        ].map((feature, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            custom={i}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="text-3xl text-primary mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Welcome
