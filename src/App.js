import logo from "./logo.svg";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Route, BrowserRouter, Switch, Navigate } from "react-router-dom";
import ProductInfo from "./pages/ProductInfo";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import "./stylesheets/Layout.css";
import "./stylesheets/products.css";
import "./stylesheets/authentication.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrdersPage from "./pages/OrdersPage";
import AdminPage from "./pages/AdminPage";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/cart">
            <ProtectedRoutes>
              <CartPage />
            </ProtectedRoutes>
          </Route>
          <Route exact path="/orders">
            <ProtectedRoutes>
              <OrdersPage />
            </ProtectedRoutes>
          </Route>
          <Route exact path="/admin">
            <ProtectedRoutes>
              <AdminPage />
            </ProtectedRoutes>
          </Route>
          <Route exact path="/productinfo/:productid">
            <ProtectedRoutes>
              <ProductInfo />
            </ProtectedRoutes>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return (window.location.href = "/login");
  }
};
