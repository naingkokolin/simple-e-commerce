import { CartContext } from "../contexts/CartContext";
import { useContext, useState } from "react";
import Button from "../components/Button";

const Checkout = () => {
  const { addToCart, reduceQuantity, cartItems, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    // console.log("Placing order...", {
    //   items: cartItems,
    //   customerInfo: formData,
    // });

    alert("Order placed successfully!");
    clearCart();

    // navigate to a confirmation page
    // navigate("/order-confirmation");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = cartItems.length < 1 || subtotal > 75 ? 0 : 5;
  const total = subtotal + tax + shipping;

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
                <p className="font-medium">
                  {/* ${(item.price * item.quantity).toFixed(2)} */}
                  $ <b>{item.price}</b>
                </p>
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
        <form onSubmit={handlePlaceOrder} className="space-y-4">
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
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
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
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Shipping Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows="3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
            ></textarea>
          </div>

          <Button text="Place Order" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Checkout;
