import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";

const AllAdvertisements = () => {
  const axiosSecure = useAxiosSecure();
  const [deleteId, setDeleteId] = useState(null);

  const { data: ads = [], refetch } = useQuery({
    queryKey: ["all-advertisements"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/advertisements");
      return data;
    },
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/advertisements/status/${id}`, { status: newStatus });
      toast.success(`Ad marked as ${newStatus}`);
      refetch();
    } catch {
      toast.error("Status update failed.");
    }
  };

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/advertisements/${deleteId}`);
      toast.success("Advertisement deleted");
      refetch();
      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">📢 All Advertisements</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="border-t text-center">
                <td className="p-3">{ad.title}</td>
                <td className="p-3">{ad.description}</td>
                <td className="p-3 capitalize">{ad.status}</td>
                <td className="p-3 space-x-2">
                  {ad.status !== "approved" && (
                    <Button
                      variant="outline"
                      onClick={() => handleStatusChange(ad._id, "approved")}
                    >
                      ✅ Approve
                    </Button>
                  )}
                  {ad.status !== "rejected" && (
                    <Button
                      variant="destructive"
                      onClick={() => handleStatusChange(ad._id, "rejected")}
                    >
                      ❌ Reject
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    onClick={() => setDeleteId(ad._id)}
                  >
                    🗑 Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <ConfirmDeleteModal
          id={deleteId}
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default AllAdvertisements;
