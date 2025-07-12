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
      className="w-full shadow-sm bg-white fixed top-0 left-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-primary"
        >
          <img src="/logo.png" alt="FreshCart Logo" className="h-8 w-8" />
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="cursor-pointer bg-primary text-white hover:bg-emerald-600">
                    Login
                  </Button>
                </motion.div>
              </NavLink>

              <NavLink to="/signup">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="cursor-pointer bg-secondary text-white hover:bg-orange-500">
                    Sign Up
                  </Button>
                </motion.div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={dashboardRoute}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="cursor-pointer bg-accent text-white hover:bg-purple-500">
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
                      className="h-9 w-9 rounded-full border-2 border-primary cursor-pointer"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-primary/90 text-white px-3 py-1 rounded-md shadow-md">
                    {user.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={ handleLogout }
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
            className="text-2xl text-primary"
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
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full"
                    >
                      <Button className="w-full cursor-pointer bg-primary text-white hover:bg-emerald-600">
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
                      <Button className="w-full cursor-pointer bg-secondary text-white hover:bg-orange-500">
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
                      <Button className="w-full cursor-pointer bg-accent text-white hover:bg-purple-500">
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
                      className="w-full cursor-pointer"
                      onClick={() => {
                        setIsOpen(false);
                        alert("Logout");
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
