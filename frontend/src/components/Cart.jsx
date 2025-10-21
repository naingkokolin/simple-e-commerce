import { useState, useRef } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const Cart = ({ initialItems = [] }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const { cartItems, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((s, it) => s + it.price * it.quantity, 0);

  function closeCart(e) {
    e.preventDefault();
    if (e.focus.target === e.target) {
      setOpen(false);
    }
  }

  if (user)
    return (
      <>
        <div
          className={`fixed bottom-20 right-6 w-80 max-w-xs bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300
                    ${
                      open
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-6 pointer-events-none"
                    }`}
          role="dialog"
          aria-hidden={!open}
        >
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Your cart</h3>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close cart"
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-4 max-h-56 overflow-auto">
            {cartItems.length === 0 ? (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((it) => (
                <div key={it._id} className="flex items-center gap-3 mb-3">
                  <img
                    src={it.image}
                    alt={it.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{it.name}</div>
                    <div className="text-xs text-gray-500">
                      Qty: {it.quantity}
                    </div>
                  </div>
                  <div className="text-sm font-semibold">
                    ${(it.price * it.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-gray-600">Total</div>
              <div className="text-lg font-bold">${total.toFixed(2)}</div>
            </div>
            {cartItems.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigate("/checkout");
                  }}
                  className="flex-1 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="py-2 px-3 text-sm bg-gray-100 rounded hover:bg-gray-200"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Floating Button */}
        <button
          onClick={() => setOpen((s) => !s)}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl hover:scale-105 transform transition"
          aria-label="Open cart"
        >
          {/* cart icon */}
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4"
            />
            <circle cx="7" cy="20" r="1" />
            <circle cx="20" cy="20" r="1" />
          </svg>

          {/* badge */}
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-500 rounded-full">
              {cartItems.length}
            </span>
          )}
        </button>
      </>
    );
};

export default Cart;
