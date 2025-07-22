import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const UpdateAdModal = ({ ad, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: ad?.title || "",
      description: ad?.description || "",
      image: ad?.image || "",
    },
  });

  const onSubmit = async (updatedData) => {
    try {
      const res = await axiosSecure.patch(`/advertisements/${ad._id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        toast.success("Advertisement updated successfully");
        refetch();
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update advertisement");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Advertisement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-3">
          <div>
            <Label className="mb-1 block">Ad Title</Label>
            <Input {...register("title", { required: true })} />
          </div>
          <div>
            <Label className="mb-1 block">Short Description</Label>
            <Input {...register("description", { required: true })} />
          </div>
          <div>
            <Label className="mb-1 block">Image URL</Label>
            <Input {...register("image", { required: true })} />
          </div>
          <Button type="submit" className="w-full mt-2">
            ✅ Update Advertisement
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAdModal;
