import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const PriceChart = ({ prices = [] }) => {
  if (!prices.length)
    return <p className="text-gray-500">No price trend data available.</p>;

  const chartData = prices.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString("en-GB"),
    price: Number(entry.price),
  }));

  return (
    <div className="mt-4">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit="৳" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3B82F6"
            strokeWidth={2.5}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
