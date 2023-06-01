import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import AddProductPage from "./pages/AddProductPage";
import ManageProducts from "./pages/ManageProducts";
import UpdateProductPage from "./pages/UpdateProdcutPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import SignInUserPage from "./pages/SignInUserPage";
import ManageUsers from "./pages/ManageUsers";
import ProductDetailPage from "./pages/ProductDetailPage";
import ErrorPage from "./pages/ErrorPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProtectedCheckoutRoute from "./components/ProtectedCheckoutRoute";

function App() {
  // 38644- Israr Rashid
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* admin related roles */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/update-product/:id" element={<UpdateProductPage />} />
        </Route>

        <Route path="/" element={<HomePage />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/register-user" element={<RegisterUserPage />} />
        <Route path="/sign-in" element={<SignInUserPage />} />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route element={<ProtectedCheckoutRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
