import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth  from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import PriceChart from "./PriceChart";
import ReviewsList from "./ReviewsList";
import ReviewForm from "./ReviewForm";
import useRole from "@/hooks/useRole";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loading from "@/components/Loading";

const DetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [ role, isRoleLoading ] = useRole();

  console.log(id, role)

  const { data: product = {}, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/products/${id}`);
      return data;
    },
  });

  const handleAddToWatchlist = async () => {
    try {
      await axiosSecure.post("/watchlist", {
        userEmail: user?.email,
        productId: id,
        addedAt: new Date(),
      });
      toast.success("⭐ Added to watchlist!");
    } catch (err) {
      toast.error("Failed to add to watchlist",err);
    }
  };

  const handleBuy = async () => {
    // try {
    //   const res = await axiosSecure.post("/create-payment-intent", {
    //     price: parseFloat(product.price),
    //   });

    //   window.location.href = res.data.url; // redirect to Stripe checkout
    // } catch (err) {
    //   toast.error("Payment failed",err);
    // }
  };

   if(isRoleLoading || isLoading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 mt-12">
      {/* 🔹 Product Info */}
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <img
          src={product.image}
          alt={product.itemName}
          className="w-full rounded shadow object-cover max-h-[400px]"
        />
        <div className="space-y-3">
          <h2 className="text-3xl font-bold">{product.itemName}</h2>
          <p className="text-gray-700">💵 Price: ৳{product.price}</p>
          <p>📅 Date: {new Date(product.date).toLocaleDateString("en-GB")}</p>
          <p>🏪 Market: {product.marketName}</p>
          <p>📃 Description: {product.description}</p>
          <p>👨‍🌾 Vendor: {product.vendorName} ({product.email})</p>

          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleAddToWatchlist}
              disabled={role === "admin" || role === "vendor"}
            >
              ⭐ Add to Watchlist
            </Button>
            <Button onClick={handleBuy}>🛒 Buy Product</Button>
          </div>
        </div>
      </div>

      {/* 📊 Price Chart Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">📈 Price Comparison</h3>
        <PriceChart prices={product.prices} />
      </div>

      {/* 💬 Review Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">💬 User Reviews</h3>
        <ReviewForm productId={product._id} />
        <ReviewsList productId={product._id} />
      </div>
    </div>
  );
};

export default DetailsPage;
