import { useQuery } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useState } from 'react';
import UpdateAdModal from '@/components/Modal/Vendor/UpdateAdModal';
import ConfirmDeleteModal from '@/components/Modal/ConfirmDeleteModal';

const MyAdvertisements = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedAd, setSelectedAd] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { data: ads = [], refetch } = useQuery({
    queryKey: ['ads', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/advertisements/${user?.email}`);
      return data;
    },
  });

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/advertisements/${id}`);
      toast.success("Advertisement deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete advertisement",error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">📢 My Advertisements</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-200 dark:bg-gray-800">
            <tr>
              <th className="p-3">Ad Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="text-center border-t">
                <td className="p-3">{ad.title}</td>
                <td className="p-3">{ad.description}</td>
                <td className="p-3 capitalize">{ad.status}</td>
                <td className="p-3 flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedAd(ad)}
                  >
                    ✏️ Update
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setDeleteId(ad._id)}
                  >
                    ❌ Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {selectedAd && (
        <UpdateAdModal
          ad={selectedAd}
          onClose={() => setSelectedAd(null)}
          refetch={refetch}
        />
      )}

      {/* Delete Confirmation */}
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

export default MyAdvertisements;
