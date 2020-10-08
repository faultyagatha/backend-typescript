import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { AppState } from "../types";

export default function Product() {
  const { name } = useParams();

  const product = useSelector((state: AppState) =>
    state.product.inCart.find((p) => p.name === name)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <h1>Product page</h1>
      <h2>{`${product.name} - $${product.price}`}</h2>
    </>
  );
}
