import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loading from "@/components/Loading";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/orders");
      return data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">🛒 All Orders (Admin View)</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">🖼️ Product</th>
              <th className="p-3">🥬 Plant</th>
              <th className="p-3">📦 Qty</th>
              <th className="p-3">💰 Price</th>
              <th className="p-3">🏪 Market</th>
              <th className="p-3">🧑‍🌾 Vendor</th>
              <th className="p-3">👤 Customer</th>
              <th className="p-3">📧 Email</th>
              <th className="p-3">🔁 TXN ID</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={order.plantImage}
                    alt="Product"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">{order.plantName}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3">৳{order.price}</td>
                <td className="p-3">{order.marketName}</td>
                <td className="p-3">{order.vendor?.name || "N/A"}</td>
                <td className="p-3 flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={order.customer?.image} />
                    <AvatarFallback>👤</AvatarFallback>
                  </Avatar>
                  <span>{order.customer?.name}</span>
                </td>
                <td className="p-3">{order.customer?.email}</td>
                <td className="p-3 text-xs">{order.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
