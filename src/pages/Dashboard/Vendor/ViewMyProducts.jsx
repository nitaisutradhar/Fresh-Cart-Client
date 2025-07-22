import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import useAxios from "@/hooks/useAxios";
import Loading from "@/components/Loading";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const ViewMyProducts = () => {
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios()
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: products = [], refetch, isLoading } = useQuery({
    queryKey: ["vendor-products", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?vendorEmail=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async () => {
    try {
        console.log(selectedProductId)
      await axiosInstance.delete(`/products/${selectedProductId}`);
      toast.success("Product deleted successfully.");
      refetch();
    } catch (err) {
      toast.error("Something went wrong.",err);
    } finally {
      setShowModal(false);
    }
  };

  if (isLoading) return <Loading />

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">📦 My Submitted Products</h2>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Price (৳)</TableHead>
              <TableHead>Market</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <motion.tr
                key={product._id}
                className="border-b"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <TableCell>{product.itemName}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.marketName}</TableCell>
                <TableCell>{new Date(product.date).toLocaleDateString('en-GB')}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-md text-sm font-semibold ${
                      product.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : product.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.status}
                  </span>
                </TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => navigate(`/dashboard/update-product/${product._id}`)}
                  >
                    ✏️ Update
                  </Button>
                  <Button
                    className="cursor-pointer"
                    variant="destructive"
                    onClick={() => {
                      setSelectedProductId(product._id);
                      setShowModal(true);
                    }}
                  >
                    🗑️ Delete
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Are you sure you want to delete this product?"
        description="Once deleted, this cannot be undone."
      />
    </motion.div>
  );
};

export default ViewMyProducts;
