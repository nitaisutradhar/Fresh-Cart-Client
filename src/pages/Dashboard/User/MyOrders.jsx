import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loading from "@/components/Loading";

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/orders/user/${user.email}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛍️ My Order List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">🥕 Product</th>
              <th className="p-3 text-left">🏪 Market</th>
              <th className="p-3 text-left">💰 Price</th>
              <th className="p-3 text-left">📅 Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{order.plantName}</td>
                  <td className="p-3">{order.marketName}</td>
                  <td className="p-3">৳{order.price}</td>
                  <td className="p-3">
                    {new Date(order._id.getTimestamp?.() ?? Date.now()).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-3 text-center">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/product-details/${order.productId}`)}
                      className="cursor-pointer"
                    >
                      🔍 View Details
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
