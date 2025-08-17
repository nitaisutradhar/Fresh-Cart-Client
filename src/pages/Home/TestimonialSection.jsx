import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Home Cook",
      comment:
        "This platform has revolutionized how I shop for groceries. I can now compare prices across different markets and always get the best deals.",
      rating: 5,
    },
    {
      name: "Mohammad Rahman",
      role: "Restaurant Owner",
      comment:
        "As a restaurant owner, I need fresh ingredients at competitive prices. This platform helps me find the best suppliers quickly.",
      rating: 5,
    },
    {
      name: "Fatima Khan",
      role: "Busy Mom",
      comment:
        "Love how easy it is to check prices before heading out to the market. Saves me time and money every week!",
      rating: 5,
    },
  ];

  return (
    <motion.section
      className="py-16 bg-green-50 dark:bg-gray-900 transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Hear from our satisfied customers
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl dark:hover:shadow-green-900 transition-all"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                "{testimonial.comment}"
              </p>

              {/* User info */}
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white">
                  {testimonial.name}
                </h4>
                <p className="text-green-600 dark:text-green-400 text-sm">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
