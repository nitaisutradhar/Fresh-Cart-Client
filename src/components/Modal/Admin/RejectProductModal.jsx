import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const RejectProductModal = ({ id, onReject, onClose }) => {
  const [feedback, setFeedback] = useState("");

  const handleReject = () => {
    if (!feedback) return;
    onReject(id, feedback);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Provide Rejection Reason</DialogTitle>
        </DialogHeader>
        <Textarea
          className="mt-2"
          placeholder="Why are you rejecting this product?"
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <DialogFooter className="mt-4 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleReject}>Reject Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectProductModal;
