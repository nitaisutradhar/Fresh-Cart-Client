import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";

const UserProfile = () => {
    const axiosSecure = useAxiosSecure();
    const {user: currentUser} = useAuth(); // Assuming you have a useAuth hook to get user information

    console.log("Current User:", currentUser.email);
  // user profile fetch
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data } = await axiosSecure("/user-profile", {
        params: { email: currentUser?.email },
      }); 
      return data; // { name, email, image, role, created_at, last_loggedIn }
    },
    // Only enable the query if currentUser is available
    enabled: !!currentUser,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium">Loading profile...</p>
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
      className="max-w-2xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-lg mt-10"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <motion.img
          src={user?.image}
          alt={user?.name}
          whileHover={{ scale: 1.05 }}
          className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-green-200"
        />

        {/* Profile Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Role:</span> {user?.role}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Joined:</span>{" "}
            {new Date(user?.created_at).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Last Login:</span>{" "}
            {new Date(user?.last_loggedIn).toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
