import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import useAxios from "@/hooks/useAxios"; // Use your axios hook!

export default function AdvertisementSection() {
  const axiosInstance = useAxios();
  const { data: advertisements = [], isLoading, isError } = useQuery({
    queryKey: ["all-advertisements"],
    queryFn: async () => {
      const res = await axiosInstance("/all-advertisements");
      return res.data || [];
    },
  });

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Auto-rotate advertisements
  useEffect(() => {
    if (advertisements.length > 0) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % advertisements.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [advertisements]);

  const nextAd = () => {
    setCurrentAdIndex((prev) => (prev + 1) % advertisements.length);
  };

  const prevAd = () => {
    setCurrentAdIndex((prev) => (prev - 1 + advertisements.length) % advertisements.length);
  };

  if (isLoading) return null;
  if (isError || advertisements.length === 0) return null;

  const currentAd = advertisements[currentAdIndex];

  return (
    <motion.section 
      className="py-16 bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Featured Promotions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Explore current promotions and vendor advertisements
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div 
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            key={currentAdIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={currentAd?.image} 
              alt={currentAd?.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                {currentAd?.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {currentAd?.description}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                {currentAd?.created_at && (
                  <>Posted: {new Date(currentAd.created_at).toLocaleDateString("en-GB")}</>
                )}
              </p>
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <button 
            onClick={prevAd}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 
                       bg-white dark:bg-gray-700 
                       bg-opacity-80 hover:bg-opacity-100 
                       dark:hover:bg-gray-600 
                       rounded-full p-3 shadow-lg transition-all duration-300"
          >
            <ChevronLeft size={24} className="text-gray-800 dark:text-gray-200" />
          </button>
          <button 
            onClick={nextAd}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 
                       bg-white dark:bg-gray-700 
                       bg-opacity-80 hover:bg-opacity-100 
                       dark:hover:bg-gray-600 
                       rounded-full p-3 shadow-lg transition-all duration-300"
          >
            <ChevronRight size={24} className="text-gray-800 dark:text-gray-200" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {advertisements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAdIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentAdIndex 
                    ? "bg-green-600 dark:bg-green-400" 
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
