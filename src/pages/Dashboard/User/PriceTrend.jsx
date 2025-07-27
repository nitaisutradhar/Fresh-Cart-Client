import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import Loading from "@/components/Loading";

const PriceTrends = () => {
  const axiosInstance = useAxios();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["price-trends"],
    queryFn: async () => {
      const res = await axiosInstance.get("/price-trends");
      return res.data;
    }
  });

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };
  if(isLoading) return <Loading />

  return (
    <div className="max-w-6xl mx-auto p-6 pl-0 grid md:grid-cols-4 gap-6">
      {/* Left Sidebar - Tracked Items */}
      <div className="col-span-1 border-r pr-4">
        <h2 className="text-xl font-bold mb-3">📌 Tracked Items</h2>
        <ul className="space-y-2">
          {products.map((product, idx) => (
            <li
              key={idx}
              onClick={() => handleSelectProduct(product)}
              className={`cursor-pointer px-3 py-2 rounded-md hover:bg-gray-100 ${
                selectedProduct?.itemName === product.itemName ? "bg-orange-100 font-semibold" : ""
              }`}
            >
              {product.itemName}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - Price Chart */}
      <div className="col-span-3">
        {selectedProduct ? (
          <>
            <h2 className="text-2xl font-bold mb-2">📈 {selectedProduct.itemName}</h2>
            <p className="mb-1">🏪 {selectedProduct.marketName}</p>
            <p className="mb-4">👨‍🌾 Vendor: {selectedProduct.vendorName}</p>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={selectedProduct.prices.map(p => ({
                  date: new Date(p.date).toLocaleDateString("en-GB"),
                  price: parseFloat(p.price)
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>

            {/* Optional: trend % logic */}
            <p className="mt-4 font-medium text-green-600">
              Trend: +3.8% last 7 days
            </p>
          </>
        ) : (
          <p className="text-gray-500">📌 Select an item to view its price trend.</p>
        )}
      </div>
    </div>
  );
};

export default PriceTrends;
