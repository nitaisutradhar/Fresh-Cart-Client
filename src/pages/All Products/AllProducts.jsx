import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";

const AllProducts = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [sort, setSort] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["public-products", sort, startDate, endDate],
    queryFn: async () => {
      const { data } = await axiosInstance("/all-products", {
        params: {
          sort,
           startDate: startDate ? new Date(startDate.setHours(0, 0, 0, 0)).toISOString() : undefined,
            endDate: endDate ? new Date(endDate.setHours(23, 59, 59, 999)).toISOString() : undefined,
        },
      });
      return data;
    },
  });

  return (
    <div className="p-5 max-w-6xl mx-auto space-y-6">

      {/* 🔽 Filters & Sorting */}
      <div className="mt-10 max-w-6xl mx-auto px-4">
  <h2 className="text-3xl font-bold text-center mb-8 flex justify-center items-center gap-2">
    🛍️ All Market Products
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {/* Start Date */}
 

<div className="flex flex-col">
  <label className="mb-1 text-gray-700 font-medium">📅 Start Date:</label>
  <DatePicker
    selected={startDate}
    onChange={setStartDate}
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
    placeholderText="Select start date"
    dateFormat="dd/MM/yyyy" // <--- This ensures input shows in day/month/year
  />
</div>

<div className="flex flex-col">
  <label className="mb-1 text-gray-700 font-medium">📅 End Date:</label>
  <DatePicker
    selected={endDate}
    onChange={setEndDate}
    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
    placeholderText="Select end date"
    dateFormat="dd/MM/yyyy"
  />
</div>


    {/* Sorting */}
    <div className="flex flex-col">
      <label className="mb-1 text-gray-700 font-medium">🔽 Sort by Price:</label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Default</option>
        <option value="lowToHigh">Low → High</option>
        <option value="highToLow">High → Low</option>
      </select>
    </div>

    {/* Apply Button */}
    <div className="flex items-end">
      <button
        onClick={() => refetch()}
        className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition duration-200 cursor-pointer"
      >
        Apply
      </button>
    </div>
  </div>
</div>


      {/* 📦 Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <img src={product.image} alt={product.itemName} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-bold mt-2">{product.itemName}</h3>
            <p>💵 Price: ৳{product.price}</p>
            <p>📅 Date: {new Date(product.date).toLocaleDateString('en-GB')}</p>
            <p>🏪 Market: {product.marketName}</p>
            <p>👨‍🌾 Vendor: {product.vendorName || "N/A"}</p>
            <button
              onClick={()=> navigate(`/product-details/${product._id}`) }
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1 rounded mt-3"
            >
              🔍 View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
