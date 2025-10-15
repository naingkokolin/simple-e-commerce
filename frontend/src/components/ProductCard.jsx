import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const { addToCart } = useCart();

  return (
    <div className="max-w-sm mt-6 rounded overflow-hidden shadow-lg p-6 bg-white transition-transform transform hover:scale-105 shadow-gray-400 h-90 w-80 flex flex-col justify-between">
      <div className="font-bold text-xl mb-2 text-gray-800">
        {product.title}
      </div>

      <div>
        <p
          className={
            isExpanded
              ? "text-gray-600 text-base mb-4"
              : "line-clamp-2 text-gray-600 text-base mb-4"
          }
        >
          {product.description}
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:underline text-sm mb-2 self-start"
        >
          {isExpanded ? "See less" : "See more"}
        </button>

        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="mb-4 h-40 w-auto"
          />
        </div>

        <div className="flex font-bold text-xl text-green-600 justify-center">
          ${product.price}
        </div>

        <div className="flex justify-between">
          <Button
            text="View Detail"
            onClick={() => {
              navigate(`/products/${product._id}`);
            }}
          />

          <Button text="Add to Cart" onClick={() => addToCart(product)} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
