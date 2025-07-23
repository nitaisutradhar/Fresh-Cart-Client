import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import { Sparkles, User, Store, ShieldCheck } from "lucide-react";

const roleIcons = {
  user: <User className="text-blue-500 w-10 h-10" />,
  vendor: <Store className="text-green-500 w-10 h-10" />,
  admin: <ShieldCheck className="text-purple-500 w-10 h-10" />,
};

const WelcomeDashboard = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  const [welcomeText, setWelcomeText] = useState("");

  useEffect(() => {
    if (!isRoleLoading) {
      let message = "";
      if (role === "admin") message = "Welcome to the Admin Dashboard";
      else if (role === "vendor") message = "Welcome to the Vendor Dashboard";
      else message = "Welcome to the User Dashboard";

      setWelcomeText(message);
    }
  }, [role, isRoleLoading]);

  return (
    <motion.div
      className="flex flex-col justify-center items-center h-full text-center px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-center gap-3 bg-muted p-6 rounded-xl shadow-md border border-gray-300"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.div
          initial={{ rotate: -15 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {roleIcons[role]}
        </motion.div>

        <div className="text-left">
          <h1 className="text-3xl font-bold text-primary mb-1">{welcomeText}</h1>
          <p className="text-gray-600 text-lg">
            Hello, <span className="font-semibold text-emerald-600">{user?.displayName || "User"}</span> 👋
          </p>
          <p className="text-muted-foreground mt-2">
            Hope you're having a great day managing your dashboard.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="mt-8 text-sm text-gray-500 flex items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Sparkles className="text-yellow-400 animate-pulse" />
        Powered by FreshCart System
      </motion.div>
    </motion.div>
  );
};

export default WelcomeDashboard;
