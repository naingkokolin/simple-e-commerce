import { useState, createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedInUser = user !== null;

  const addToCart = (product) => {
    if (isLoggedInUser) {
      const existingItem = cartItems.find((item) => item._id === product._id);
      if (existingItem) {
        setCartItems(
          cartItems.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    } else {
      navigate("/login");
    }
  };

  const reduceQuantity = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) {
      if (existingItem.quantity === 1) {
        setCartItems(cartItems.filter((item) => item._id !== product._id));
      } else {
        setCartItems(
          cartItems.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }
    }
  };

  const removeProductFromCart = (product) => {
    setCartItems((items) => items.filter((item) => item._id !== product._id));
  };

  const clearCart = () => setCartItems([]);

  const value = {
    cartItems,
    addToCart,
    reduceQuantity,
    removeProductFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
