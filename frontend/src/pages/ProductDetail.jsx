import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { CartContext } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_BACKEND_API;

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}api/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}api/products/`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return <p className="text-center p-4">Product Not Found!</p>;
  }

  return (
    <div>
      <div
        id="#detail"
        className="max-w-2xl mx-auto p-6 bg-white rounded shadow-lg flex flex-col justify-around m-2"
      >
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="mb-4 h-auto w-60"
          />
        </div>
        <p className="text-gray-700 mb-4">{product.description}</p>

        {/* Category, Rating and similar products  */}
        <div className="flex justify-around items-center my-2">
          <p>
            Category:{" "}
            <span className="text-blue-500 font-bold uppercase">
              {product.category}
            </span>
          </p>
          <p>
            Price:{" "}
            <span className="text-green-600 font-bold text-xl">
              $ {product.price}
            </span>
          </p>
        </div>

        <div className="flex justify-center">
          <Button text="Add To Cart" onClick={() => addToCart(product)} />
        </div>
      </div>

      <h2 className="text-center text-3xl font-bold mt-8">
        You may also like these products
      </h2>
      {/* parent container for similar categories */}
      <div className="max-w-8xl p-6 bg-white rounded shadow-lg flex flex-wrap justify-around mb-8">
        {/* each item */}
        {products
          .filter(
            (item) =>
              item.category === product.category && item._id !== product._id
          )
          .map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
      </div>
    </div>
  );
};

export default ProductDetail;
