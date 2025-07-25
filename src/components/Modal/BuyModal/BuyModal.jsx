import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const BuyModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const unitPrice = parseFloat(product.price) || 0;
    setTotalPrice(quantity * unitPrice);
  }, [quantity, product.price]);

  const handleBuy = () => {
    // 👉 Stripe Checkout logic or database purchase saving here
    console.log("Buying", quantity, "units for total price", totalPrice);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle>🛒 Confirm Purchase</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p>🥕 <strong>{product.itemName}</strong></p>
          <p>💵 Unit Price: ৳{product.price}</p>
          <p>🏪 Market: {product.marketName}</p>
          <p>👨‍🌾 Vendor: {product.vendorName}</p>
        </div>

        <div className="space-y-1">
          <label className="font-medium">🔢 Quantity (Kg):</label>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <p className="font-semibold mt-2">💰 Total Price: ৳{totalPrice.toFixed(2)}</p>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleBuy} className="bg-green-600 hover:bg-green-700 text-white">
            ✅ Buy Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyModal;
