import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import { Link } from "react-router";

const ProductSection = () => {
  const axiosInstance = useAxios();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["product-summary"],
    queryFn: async () => {
      const { data } = await axiosInstance("/products-summary");
      return data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        📦 Market Updates
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            className="border rounded shadow hover:shadow-lg transition p-4 
                       bg-white dark:bg-gray-800 
                       border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={product.image}
              alt={product.itemName}
              className="w-full h-40 object-cover rounded"
            />
            <div className="mt-3 space-y-1">
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                🏪 {product.marketName}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                📅 {new Date(product.date).toLocaleDateString("en-GB")}
              </p>
              <ul className="text-sm list-disc ml-5 text-gray-700 dark:text-gray-300">
                {product.itemName} — ৳{product.price}/kg
              </ul>
              <Link to={`/product-details/${product._id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded cursor-pointer transition 
                             dark:bg-green-500 dark:hover:bg-green-600"
                >
                  🔍 View Details
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
