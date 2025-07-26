import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAuth from "@/hooks/useAuth";
import CheckoutForm from "@/components/Form/CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);
const BuyModal = ({ product, onClose, fetchProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const {user } = useAuth()
   const [orderData, setOrderData] = useState({
    vendor: {
        name: product.vendorName,
        email: product.vendorEmail,
    },
    productId: product._id,
    quantity: 1,
    price: product.price,
    plantName: product.itemName,
    plantImage: product.image,
    marketName: product.marketName
  })

  useEffect(() => {
    if (user)
      setOrderData(prev => {
        return {
          ...prev,
          customer: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
          },
        }
      })
  }, [user])

  useEffect(() => {
    const unitPrice = parseFloat(product.price) || 0;
    setTotalPrice(quantity * unitPrice);

    setOrderData(prev =>{
        return {
            ...prev,
            quantity,
            price: quantity * unitPrice
        }
    })
  }, [quantity, product.price]);

  console.log(orderData)
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

        {/* Stripe Checkout Form */}
        <div>
            <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} closeModal={onClose} orderData={orderData} fetchProduct={fetchProduct} />
            </Elements>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyModal;
