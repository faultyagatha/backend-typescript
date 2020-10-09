import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import { AppState } from "../../types";

const CartButton = () => {
  const { inCart } = useSelector((state: AppState) => state.product);
  return (
    <Link to="/cart">
      <Button className="btn btn-outline-secondary">
        <i className="fa fa-shopping-cart"></i>
        <span className="badge">{inCart.length}</span>
      </Button>
    </Link>
  );
};

export default CartButton;
