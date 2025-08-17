import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const ContactUs = () => {
  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // mutation for sending contact message
  const mutation = useMutation({
    mutationFn: async (formData) => {
      return toast.success("Message sent successfully!", formData);
      // const { data } = await axios.post("/api/contact", formData);
      // return data;
    },
    onSuccess: () => {
      reset();
    },
    onError: () => {
      toast.error("Something went wrong. Please try again!");
    },
  });

  // submit handler
  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto p-6 md:p-12 my-5 bg-white dark:bg-gray-900 rounded-2xl shadow-lg mt-10 transition-colors duration-300"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Contact Us
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Subject
          </label>
          <input
            type="text"
            {...register("subject", { required: "Subject is required" })}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.subject && (
            <p className="text-red-500 text-sm">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            rows="5"
            {...register("message", { required: "Message is required" })}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={mutation.isLoading}
          className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium w-full disabled:opacity-50 cursor-pointer transition-colors duration-300"
        >
          {mutation.isLoading ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactUs;
