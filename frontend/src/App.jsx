import "./App.css";
import Product from "./pages/Product";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./components/Cart";
import { CartProvider } from "./contexts/CartContext";
import Checkout from "./pages/Checkout";
import AdminLayout from "./admin/AdminLayout";
import ProductManagement from "./admin/ProductManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import Maintenance from "./pages/Maintenance";
import NewProduct from "./pages/NewProduct";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
// import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Product />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/new-product/" element={<NewProduct />} />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout>
                        <ProductManagement />
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
              <Cart />
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
