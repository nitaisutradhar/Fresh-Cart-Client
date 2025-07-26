import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const ManageWatchlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);

  const { data: watchlist = [], refetch } = useQuery({
    queryKey: ["watchlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/watchlist", {
        params: { email: user?.email },
      });
      return data;
    },
  });

  const handleDelete = async (id) => {
    console.log(id)
    try {
      await axiosSecure.delete(`/watchlist/${id}`);
      toast.success("✅ Removed from watchlist");
      refetch();
    } catch (err) {
      toast.error("❌ Failed to remove item",err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">🔖 Manage Watchlist</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">📦 Product Name</th>
            <th className="p-3 text-left">🏪 Market Name</th>
            <th className="p-3 text-left">📅 Date Added</th>
            <th className="p-3 text-left">⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-3">{item.productName}</td>
              <td className="p-3">{item.marketName}</td>
              <td className="p-3">
                {new Date(item.addedAt).toLocaleDateString("en-GB")}
              </td>
              <td className="p-3 flex gap-3">
                <Button
                  onClick={() => navigate("/all-products")}
                  variant="outline"
                  className="cursor-pointer"
                >
                  ➕ Add More
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteId(item._id)}
                  className="cursor-pointer"
                >
                  ❌ Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
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

// Confirm Delete Modal
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
    const handleConfirm = async () => {
        await onConfirm();
        onCancel();
    };

    return (
        <Dialog open onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to remove this item from your watchlist?</p>
                <DialogFooter className="flex gap-3 justify-end mt-4">
                    <Button variant="ghost" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm}>
                        Yes, Remove
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export default ManageWatchlist;
