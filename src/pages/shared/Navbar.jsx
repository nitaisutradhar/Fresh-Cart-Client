import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { navItems } from "./navItems";
import useAuth from "@/hooks/useAuth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user: currentUser,logOut } = useAuth();
  const navigate = useNavigate();

  const isLoggedIn = !!currentUser; // Replace with actual Firebase auth check

  const user = {
    name: currentUser?.displayName || "Guest",
    photo: currentUser?.photoURL || "https://i.pravatar.cc/40?img=3",
  };

  const dashboardRoute = `/dashboard`;

  const handleLogout = async () => {
  try {
    await logOut()
    toast.success("You have been logged out.")
    navigate("/") // or navigate("/login")
  } catch (err) {
    toast.error("Logout failed. Please try again.")
    console.error(err)
  }
}

  return (
    <motion.header
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-green-900/90 via-green-800/80 to-green-900/90 backdrop-blur-md shadow-md text-white"
>
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    {/* Logo */}
    <NavLink
      to="/"
      className="flex items-center gap-2 text-xl font-bold text-white hover:text-emerald-300"
    >
      <img src="/white-stroke-logo.png" alt="FreshCart Logo" className="h-8 w-8" />
      <span>FreshCart</span>
    </NavLink>

    {/* Desktop Menu */}
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map(({ label, path }, index) => (
        <NavLink
          key={path}
          to={path}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.3 }}
          className={({ isActive }) =>
            `font-medium transition-colors cursor-pointer ${
              isActive
                ? "text-emerald-300 font-semibold"
                : "text-gray-100"
            } hover:text-emerald-300`
          }
        >
          {label}
        </NavLink>
      ))}

      {!isLoggedIn ? (
        <>
          <NavLink to="/login">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="cursor-pointer bg-emerald-600 text-white hover:bg-emerald-500">
                Login
              </Button>
            </motion.div>
          </NavLink>

          <NavLink to="/signup">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="cursor-pointer bg-orange-500 text-white hover:bg-orange-400">
                Sign Up
              </Button>
            </motion.div>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to={dashboardRoute}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="cursor-pointer bg-purple-600 text-white hover:bg-purple-500">
                Dashboard
              </Button>
            </motion.div>
          </NavLink>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <img
                  src={user.photo}
                  alt="Profile"
                  className="h-9 w-9 rounded-full border-2 border-emerald-400 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-emerald-600/90 text-white px-3 py-1 rounded-md shadow-md">
                {user.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="destructive"
              className="cursor-pointer bg-red-600 hover:bg-red-500 text-white"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </motion.div>
        </>
      )}
    </nav>

    {/* Mobile Toggle */}
    <div className="md:hidden z-50">
      <motion.button
        whileTap={{ scale: 0.9, rotate: 90 }}
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl text-white"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </motion.button>
    </div>
  </div>

  {/* Mobile Menu */}
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="md:hidden bg-gradient-to-b from-green-900/95 via-green-800/90 to-green-900/95 text-white shadow-inner"
      >
        <div className="flex flex-col items-start px-6 py-4 gap-4">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-base font-medium ${
                  isActive ? "text-emerald-300 font-semibold" : "text-gray-100"
                } hover:text-emerald-300`
              }
            >
              {label}
            </NavLink>
          ))}

          {!isLoggedIn ? (
            <>
              <NavLink to="/login" onClick={() => setIsOpen(false)}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <Button className="w-full cursor-pointer bg-emerald-600 text-white hover:bg-emerald-500">
                    Login
                  </Button>
                </motion.div>
              </NavLink>

              <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <Button className="w-full cursor-pointer bg-orange-500 text-white hover:bg-orange-400">
                    Sign Up
                  </Button>
                </motion.div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={dashboardRoute} onClick={() => setIsOpen(false)}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <Button className="w-full cursor-pointer bg-purple-600 text-white hover:bg-purple-500">
                    Dashboard
                  </Button>
                </motion.div>
              </NavLink>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Button
                  variant="destructive"
                  className="w-full cursor-pointer bg-red-600 hover:bg-red-500 text-white"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
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
</motion.header>

  );
};

export default Navbar;
