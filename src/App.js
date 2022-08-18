import { useState, useEffect } from "react";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import SpecificProduct from "./pages/SpecificProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./UserContext";
import Cart from "./pages/Cart";
import OrderPage from "./pages/OrderPage";

// react-router
// BrowserRouter as Router(alternative)
import { BrowserRouter, Routes, Route } from "react-router-dom";

// <>..</> (Fragment) needs to add if we added multiple components/html tags
function App() {
  // state hook for the user state that defined here for global scope
  // This will be used to store the user information and will be used for validating if a user is logged in on the app or not.

  const [user, setUser] = useState({
    accessToken: localStorage.getItem("accessToken"),
    isAdmin: localStorage.getItem("isAdmin") === "true",
  });

  useEffect(() => {
    document.title = "weekendbaker";
  }, []);

  // Function for clearing localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  };

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <BrowserRouter>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/products/:productId/detail"
            element={<SpecificProduct />}
          />
          <Route path="/carts" element={<Cart />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
