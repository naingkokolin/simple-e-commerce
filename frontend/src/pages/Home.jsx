import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import heroImage from "../assets/hero_image.jpg";
import logo from "../assets/logo.png";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKEND_API;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}api/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative h-96 md:h-[500px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${logo})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fade-in-down">
            Elevate Your Style
          </h1>
          <p className="text-lg md:text-xl max-w-lg mx-auto mb-6 opacity-0 animate-fade-in-up">
            Discover our curated collection of modern fashion and timeless
            essentials.
          </p>
          <a
            href="#products"
            className="inline-block bg-white text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Shop Now
          </a>
        </div>
      </div>

      {/* Featured Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            text={"Explore Products"}
            onClick={() => navigate("/products")}
          />
        </div>
      </section>

      {/* Call-to-Action Banner */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Sign up for our newsletter to get exclusive deals, new arrivals, and
            the latest news directly to your inbox.
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="py-3 px-6 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 w-full max-w-sm"
            />
            <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-r-full shadow-lg transition-colors hover:bg-gray-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
