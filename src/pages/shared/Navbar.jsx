import { useState } from "react"
import { NavLink } from "react-router"
import { AnimatePresence, motion } from "framer-motion"
import { FiMenu, FiX } from "react-icons/fi"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const isLoggedIn = true // Replace with actual Firebase auth check
  const role = "admin"
  const user = {
    name: "Nitai",
    photo: "https://i.pravatar.cc/40?img=3",
  }

  const dashboardRoute = `/dashboard/${role}`

  const navItems = [
    { label: "Home", path: "/" },
    { label: "All Products", path: "/all-products" },
    { label: "Offers", path: "/offers" },
  ]

  return (
    <header className="w-full shadow-sm bg-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <img src="/logo.png" alt="FreshCart Logo" className="h-8 w-8" />
          <span>FreshCart</span>
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `font-medium transition-colors cursor-pointer ${
                  isActive ? "text-primary font-semibold" : "text-gray-600"
                } hover:text-emerald-600`
              }
            >
              {label}
            </NavLink>
          ))}

          {!isLoggedIn ? (
            <>
              <NavLink to="/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="cursor-pointer bg-primary text-white hover:bg-emerald-600">
                    Login
                  </Button>
                </motion.div>
              </NavLink>

              <NavLink to="/signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="cursor-pointer bg-secondary text-white hover:bg-orange-500">
                    Sign Up
                  </Button>
                </motion.div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={dashboardRoute}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="cursor-pointer bg-accent text-white hover:bg-purple-500">
                    Dashboard
                  </Button>
                </motion.div>
              </NavLink>

              <img
                src={user.photo}
                alt="Profile"
                className="h-9 w-9 rounded-full border-2 border-primary"
              />

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => alert("Logout")}
                >
                  Logout
                </Button>
              </motion.div>
            </>
          )}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-primary">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-inner"
          >
            <div className="flex flex-col items-start px-6 py-4 gap-4">
              {navItems.map(({ label, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium ${
                      isActive ? "text-primary font-semibold" : "text-gray-600"
                    } hover:text-emerald-600`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {!isLoggedIn ? (
                <>
                  <NavLink to="/login" onClick={() => setIsOpen(false)}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                      <Button className="w-full cursor-pointer bg-primary text-white hover:bg-emerald-600">
                        Login
                      </Button>
                    </motion.div>
                  </NavLink>

                  <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                      <Button className="w-full cursor-pointer bg-secondary text-white hover:bg-orange-500">
                        Sign Up
                      </Button>
                    </motion.div>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to={dashboardRoute} onClick={() => setIsOpen(false)}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                      <Button className="w-full cursor-pointer bg-accent text-white hover:bg-purple-500">
                        Dashboard
                      </Button>
                    </motion.div>
                  </NavLink>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                    <Button
                      variant="destructive"
                      className="w-full cursor-pointer"
                      onClick={() => {
                        setIsOpen(false)
                        alert("Logout")
                      }}
                    >
                      Logout
                    </Button>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
