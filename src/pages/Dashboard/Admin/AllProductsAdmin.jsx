import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";
import RejectProductModal from "@/components/Modal/Admin/RejectProductModal";

const AllProductsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [rejectionProduct, setRejectionProduct] = useState(null);

  const { data: products = [], refetch } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-products");
      return data;
    },
  });

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/products/approve/${id}`);
      toast.success("Product approved ✅");
      refetch();
    } catch {
      toast.error("Failed to approve product ❌");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      refetch();
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const handleReject = async (id, feedback) => {
  try {
    // PATCH request to backend with feedback
    const res = await axiosSecure.patch(`/products/reject/${id}`, {
      rejectionFeedback: feedback,
    });
    if (res.data.modifiedCount > 0) {
      toast.success("Product rejected!");
      setRejectionProduct(null); // close modal
      refetch(); // refresh product list
    } else {
      toast.error("Failed to reject product.");
    }
  } catch (err) {
    toast.error("Server error!");
    console.error(err);
  }
};
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">🛒 All Vendor Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Item</th>
              <th className="p-3">Price</th>
              <th className="p-3">Market</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t text-center">
                <td className="p-3">{p.itemName}</td>
                <td className="p-3">৳{p.price}</td>
                <td className="p-3">{p.marketName}</td>
                <td className="p-3">{new Date(p.date).toLocaleDateString('en-GB')}</td>
                <td className={`p-3 capitalize ${p.status === "pending" ? "text-orange-500" : p.status === "approved" ? "text-green-600" : "text-red-500"}`}>
                  {p.status}
                </td>
                <td className="p-3 flex flex-wrap justify-center gap-2">
                  {p.status === "pending" && (
                    <>
                      <Button className="cursor-pointer" variant="default" onClick={() => handleApprove(p._id)}>Approve</Button>
                      <Button variant="destructive" onClick={() => setRejectionProduct(p)}>❌ Reject</Button>
                    </>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/dashboard/update-product/${p._id}`)}
                  >
                    ✏️ Update
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setDeleteId(p._id)}
                  >
                    🗑️ Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rejectionProduct && (
    <RejectProductModal
        id={rejectionProduct._id}
        onReject={handleReject}
        onClose={() => setRejectionProduct(null)}
    />
    )}


      {/* Confirm Delete Modal */}
      {deleteId && (
        <ConfirmDeleteModal
          id={deleteId}
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default AllProductsAdmin;
