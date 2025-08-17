import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
    try {
      await axiosSecure.delete(`/watchlist/${id}`);
      toast.success("✅ Removed from watchlist");
      refetch();
    } catch (err) {
      toast.error("❌ Failed to remove item", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5 bg-white dark:bg-card dark:text-foreground rounded-lg shadow transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-foreground">
        🔖 Manage Watchlist
      </h2>

      <table className="w-full border border-gray-300 dark:border-border rounded-lg">
        <thead className="bg-gray-100 dark:bg-muted/50">
          <tr>
            <th className="p-3 text-left text-gray-600 dark:text-muted-foreground">
              📦 Product Name
            </th>
            <th className="p-3 text-left text-gray-600 dark:text-muted-foreground">
              🏪 Market Name
            </th>
            <th className="p-3 text-left text-gray-600 dark:text-muted-foreground">
              📅 Date Added
            </th>
            <th className="p-3 text-left text-gray-600 dark:text-muted-foreground">
              ⚙️ Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((item) => (
            <tr
              key={item._id}
              className="border-t border-gray-200 dark:border-border hover:bg-gray-50 dark:hover:bg-muted/50 transition-colors"
            >
              <td className="p-3 text-gray-700 dark:text-foreground">
                {item.productName}
              </td>
              <td className="p-3 text-gray-700 dark:text-foreground">
                {item.marketName}
              </td>
              <td className="p-3 text-gray-700 dark:text-foreground">
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
const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  const handleConfirm = async () => {
    await onConfirm();
    onCancel();
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="dark:bg-gray-800 dark:text-gray-100 transition-colors duration-300">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
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
