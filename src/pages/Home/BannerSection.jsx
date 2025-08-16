import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function BannerSection() {
  const navigate = useNavigate();
  return (
    <motion.section 
      className="relative h-[700px] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=1200&auto=format&fit=crop')",
        }}
      >
        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-emerald-800/60 to-teal-700/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Circles */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-green-400/20 rounded-full blur-xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 right-20 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-emerald-400/15 rounded-full blur-2xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -15, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Geometric Patterns */}
        <motion.div 
          className="absolute top-16 right-10 w-20 h-20 border-2 border-white/20 rotate-45"
          animate={{ rotate: [45, 225, 45] }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-1/3 w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-lg rotate-12"
          animate={{ 
            rotate: [12, 372, 12],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <motion.div 
          className="text-white max-w-3xl"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full text-green-200 text-sm font-medium mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            🌟 Best Market Prices in Bangladesh
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Fresh Local
            <br />
            <span className="text-green-300">Markets</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover the best prices from local markets across the city. Fresh produce, competitive prices, all in one place.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              className="cursor-pointer group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/all-products')}
            >
              <ShoppingCart size={24} />
              <span>Explore Markets</span>
              <motion.div
                className="w-2 h-2 bg-white rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.button>
            
            <motion.button 
              className="cursor-pointer group border-2 border-white/30 backdrop-blur-sm text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/about')}
            >
              Learn More
              <motion.span
                className="transform transition-transform group-hover:translate-x-1"
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300">50+</div>
              <div className="text-gray-300 text-sm">Local Markets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300">1000+</div>
              <div className="text-gray-300 text-sm">Daily Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">24/7</div>
              <div className="text-gray-300 text-sm">Price Updates</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side decorative elements */}
        <motion.div 
          className="hidden lg:block absolute right-10 top-1/2 transform -translate-y-1/2"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div 
            className="w-80 h-80 relative"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-2 border-green-400/30 rounded-full"></div>
            <div className="absolute inset-4 border border-blue-400/20 rounded-full"></div>
            <div className="absolute inset-8 border border-emerald-400/20 rounded-full"></div>
            
            {/* Floating icons */}
            <motion.div 
              className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🥕
            </motion.div>
            <motion.div 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-4xl"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              🍅
            </motion.div>
            <motion.div 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl"
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              🧅
            </motion.div>
            <motion.div 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-4xl"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              🥬
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
