/* eslint-disable no-unused-vars */
import { NavLink } from "react-router"
import { motion } from "framer-motion"

const MenuItem = ({ label, address, icon: Icon}) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `group relative flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
          isActive
            ? "bg-primary/10 text-primary font-semibold"
            : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
        }`
      }
    >
      {/* Icon with hover/active animation */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="text-xl"
      >
        <Icon />
      </motion.div>

      {/* Label */}
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-medium tracking-wide"
        >
          {label}
        </motion.span>
    </NavLink>
  )
}

export default MenuItem
