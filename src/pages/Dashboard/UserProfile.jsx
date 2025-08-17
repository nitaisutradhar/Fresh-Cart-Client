import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";

const UserProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();

  console.log("Current User:", currentUser.email);

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data } = await axiosSecure("/user-profile", {
        params: { email: currentUser?.email },
      });
      return data;
    },
    enabled: !!currentUser,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Loading profile...
        </p>
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load profile!");
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-red-500 font-medium">Something went wrong!</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto p-6 md:p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900 mt-10"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <motion.img
          src={user?.image}
          alt={user?.name}
          whileHover={{ scale: 1.05 }}
          className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-green-200 dark:border-green-700"
        />

        {/* Profile Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            {user?.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <span className="font-semibold">Role:</span> {user?.role}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(user?.created_at).toLocaleDateString()}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Last Login:</span>{" "}
            {new Date(user?.last_loggedIn).toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
