import React from "react";
import { motion } from "framer-motion";
import { Users, ShoppingCart, TrendingUp, Leaf } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-green-100 via-white to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-400"
        >
          About <span className="text-green-500 dark:text-green-300">Fresh Cart</span>
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Your trusted marketplace for daily essentials, fresh produce, and
          reliable vendor connections.
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-8 px-6 md:px-20 py-16">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl shadow-lg border bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400">
            Our Mission
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            To provide customers with transparent and fair pricing of local
            market products while empowering vendors with digital tools to
            showcase and manage their businesses.
          </p>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl shadow-lg border bg-white dark:bg-gray-800 dark:border-gray-700"
        >
          <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400">
            Our Vision
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            To become the leading platform for connecting local vendors and
            customers, promoting sustainable shopping, and building trust
            through innovation.
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 mt-10 px-6 md:px-20">
          {[
            {
              icon: ShoppingCart,
              title: "Daily Essentials",
              desc: "Get all your fresh groceries in one place.",
            },
            {
              icon: TrendingUp,
              title: "Price Tracking",
              desc: "Stay updated with live market price trends.",
            },
            {
              icon: Users,
              title: "Vendor Support",
              desc: "Empowering local vendors with digital reach.",
            },
            {
              icon: Leaf,
              title: "Fresh & Organic",
              desc: "Direct from farms and trusted sources.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-xl dark:hover:shadow-green-900 transition cursor-pointer"
            >
              <item.icon className="w-10 h-10 text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team / Info */}
      <section className="py-16 px-6 md:px-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-green-700 dark:text-green-400"
        >
          Who We Are
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
        >
          Kacha Bazar is a platform created to digitize traditional markets.
          We aim to build trust between customers and vendors by providing fair
          prices, easy access, and reliable service.
        </motion.p>
      </section>
    </div>
  );
}
