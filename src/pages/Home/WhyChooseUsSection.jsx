import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Truck, Users } from 'lucide-react';

export default function WhyChooseUsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const features = [
    {
      icon: <TrendingUp size={40} />,
      title: "Real-time Prices",
      description: "Get live market prices updated throughout the day"
    },
    {
      icon: <Shield size={40} />,
      title: "Verified Markets",
      description: "All markets are verified and trusted by our community"
    },
    {
      icon: <Truck size={40} />,
      title: "Easy Access",
      description: "Find directions and contact information for all markets"
    },
    {
      icon: <Users size={40} />,
      title: "Community Driven",
      description: "Built by the community, for the community"
    }
  ];

  return (
    <motion.section 
      className="py-16 bg-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Our Platform?</h2>
          <p className="text-gray-600 text-lg">Connecting you with the best local markets</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-green-600 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
