import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { AppState } from "../types";
import { removeProduct } from "../redux/actions";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const productsInCart = useSelector((state: AppState) => state.product.inCart);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <h3 className="text-center">
        {`You have ${productsInCart.length} items in your cart`}
        <span> {`Total: ${productsInCart.length}€`}</span>
      </h3>
      <div className="cart">
        {productsInCart.map((product) => {
          return (
            <div className="card rounded" key={product.name}>
              <p className="card-img-top">{product.imageCover}</p>
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {product.description}
                </h6>
                <p className="card-text">{`Duration: ${product.duration} hours`}</p>
                <p>{`Difficulty: ${product.difficulty}`}</p>
                <p>{`Price: ${product.price}€`}</p>
                <p>
                  <button
                    className="ui teal basic button"
                    onClick={() => dispatch(removeProduct(product))}
                  >
                    Cancel
                  </button>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
