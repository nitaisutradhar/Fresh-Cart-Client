import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";

const ReviewsList = ({ productId }) => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${productId}`);
      return res.data;
    },
    enabled: !!productId,
  });

  if (isLoading) return <p>Loading reviews...</p>;
  if (reviews.length === 0) return <p className="text-gray-500">No reviews yet.</p>;

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-2xl font-semibold mb-4">💬 User Reviews</h3>
      {reviews.map((review) => (
        <div
          key={review._id}
          className="border p-4 rounded-md shadow-sm hover:shadow-md transition bg-white"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="font-semibold">{review.userName}</p>
              <p className="text-sm text-gray-600">{review.userEmail}</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 font-bold">
              {Array.from({ length: review.rating }).map((_, i) => (
                <FaStar key={i} />
              ))}
              <span className="text-gray-600 ml-1 text-sm">
                ({review.rating}/5)
              </span>
            </div>
          </div>
          <p className="text-gray-800">{review.comment}</p>
          <p className="text-xs text-gray-500 mt-2">
            🕒 {new Date(review.createdAt).toLocaleString("en-GB")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
