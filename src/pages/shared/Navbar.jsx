import { useState } from "react"
import { Link } from "react-router"
import { motion as Motion, AnimatePresence } from "framer-motion"
import { FiMenu, FiX } from "react-icons/fi"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "All Products", path: "/all-products" },
    { label: "Offers", path: "/offers" },
  ]

  return (
    <header className="w-full shadow-sm bg-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
        <img src="/logo.png" alt="FreshCart Logo" className="h-8 w-8" />
        <span>FreshCart</span>
        </Link>


        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/login">
            <Button className="bg-primary text-white hover:bg-emerald-600">
              Login
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-primary">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-inner"
          >
            <div className="flex flex-col items-start px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-700 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="bg-primary w-full text-white">Login</Button>
              </Link>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
