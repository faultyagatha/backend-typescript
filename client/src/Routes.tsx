import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";
import SignUp from "./pages/Signup";
import About from "./pages/About";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import User from "./pages/User";
import AllUsers from "./pages/AllUsers";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/products/" component={Products} />
    <Route exact path="/products/:id" component={Product} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/cart/:id?" component={Cart} />
    <Route exact path="/profile" component={User} />
    <Route exact path="/admin/users" component={AllUsers} />
    <Route exact path="/admin/products" component={AllUsers} />
  </Switch>
);

export default Routes;
