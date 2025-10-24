import { CartContext } from "../contexts/CartContext";
import { useContext, useState } from "react";
import Button from "../components/Button";
import axios from "axios";

const Checkout = () => {
  const { addToCart, reduceQuantity, cartItems, clearCart } =
    useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    paymentMethod: "",
    shippingAddress: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const apiUrl = import.meta.env.VITE_BACKEND_API;

  // Calculate order totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = cartItems.length < 1 || subtotal > 75 ? 0 : 5;
  const total = subtotal + tax + shipping;

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle order creation
  const handleOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    // Build the order data to send to backend
    const orderData = {
      items: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress: formData.shippingAddress,
      paymentMethod: formData.paymentMethod,
      totalPrice: total,
    };

    try {
      const response = await axios.post(
        `${apiUrl}api/order/create-order`,
        orderData,
        { withCredentials: true }
      );

      alert("Order placed successfully!");
      clearCart();
      console.log("Order response:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.response && error.response.data?.message)
        setErrorMessage(error.response.data.message);
      else setErrorMessage("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Order Summary Section */}
      <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="font-medium">${item.price}</p>
                <Button text="-" onClick={() => reduceQuantity(item)} />
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                <Button text="+" onClick={() => addToCart(item)} />
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 pt-4 border-t border-gray-200 space-y-2 text-right">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-xl font-bold mt-4 pt-2 border-t border-gray-300">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Form Section */}
      <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
        <form onSubmit={handleOrder} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
            />
          </div>

          <div>
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Method
            </label>
            <input
              type="text"
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
            />
          </div>

          <div>
            <label
              htmlFor="shippingAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Shipping Address
            </label>
            <textarea
              id="shippingAddress"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
            ></textarea>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <Button text="Place Order" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Checkout;
