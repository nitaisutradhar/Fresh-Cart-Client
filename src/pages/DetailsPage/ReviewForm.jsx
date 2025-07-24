import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";

const ReviewForm = ({ productId }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post("/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("✅ Review submitted!");
      queryClient.invalidateQueries(["reviews", productId]);
      reset();
    },
    onError: (err) => {
      if (err?.response?.status === 409) {
        toast.error("❌ You've already reviewed this product.");
      } else {
        toast.error("🚨 Failed to submit review.");
      }
    },
  });

  const onSubmit = async (data) => {
    const review = {
      productId,
      userEmail: user.email,
      userName: user.displayName,
      rating: Number(data.rating),
      comment: data.comment,
      createdAt: new Date().toISOString(),
    };

    await mutateAsync(review);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
      <h3 className="text-xl font-bold mb-2">🗣️ Share Your Feedback</h3>

      <div>
        <label className="font-medium block mb-1">⭐ Rating (1-5)</label>
        <select
          {...register("rating", { required: true })}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select rating</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} Star{r > 1 ? "s" : ""}
            </option>
          ))}
        </select>
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">Rating is required</p>
        )}
      </div>

      <div>
        <label className="font-medium block mb-1">💬 Comment</label>
        <textarea
          {...register("comment", { required: true })}
          rows={4}
          className="w-full border px-3 py-2 rounded"
          placeholder="Write your opinion about the price..."
        ></textarea>
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">Comment is required</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow cursor-pointer"
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
