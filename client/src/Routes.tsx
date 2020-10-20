import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";
import SignUp from "./pages/Signup";
import About from "./pages/About";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import User from "./pages/User";
import ListUsersAdmin from "./pages/ListUsersAdmin";
import UpdateUserAdmin from "./pages/UpdateUserAdmin";
import ListProductsAdmin from "./pages/ListProductsAdmin";
import UpdateProductAdmin from "./pages/UpdateProductAdmin";
import CreateProductAdmin from "./pages/CreateProductAdmin";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/products/" component={Products} />
    <Route exact path="/products/:id" component={Product} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/cart/:id?" component={Cart} />
    <Route exact path="/checkout" component={Checkout} />
    <Route exact path="/profile" component={User} />
    <Route exact path="/admin/users" component={ListUsersAdmin} />
    <Route exact path="/admin/users/:id" component={UpdateUserAdmin} />
    <Route exact path="/admin/products" component={ListProductsAdmin} />
    <Route exact path="/admin/products/:id" component={UpdateProductAdmin} />
    <Route exact path="/admin/create" component={CreateProductAdmin} />
  </Switch>
);

export default Routes;
