import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth(); // ✅ logged-in admin

  const [updatingId, setUpdatingId] = useState(null);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  const handleRoleChange = async (id, newRole) => {
    setUpdatingId(id);
    try {
      await axiosSecure.patch(`/users/${id}/role`, { role: newRole });
      toast.success("Role updated!");
      refetch();
    } catch {
      toast.error("Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              const isCurrentAdmin = currentUser?.email === user.email;

              return (
                <tr key={user._id} className="text-center border-t">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3 space-x-2">
                    {["user", "vendor", "admin"].map(role => (
                      <Button
                        key={role}
                        variant={user.role === role ? "default" : "outline"}
                        disabled={user.role === role || updatingId === user._id || isCurrentAdmin}
                        onClick={() => handleRoleChange(user._id, role)}
                        className="cursor-pointer"
                      >
                        Make {role}
                      </Button>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default AllUsers;
