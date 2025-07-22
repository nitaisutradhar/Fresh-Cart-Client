import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  const handleConfirm = async () => {
    await onConfirm();  // perform delete
    onCancel();         // close modal
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600">
          This action cannot be undone. It will permanently delete the advertisement.
        </p>
        <DialogFooter className="mt-4 flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel} className="cursor-pointer">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} className="cursor-pointer">
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
