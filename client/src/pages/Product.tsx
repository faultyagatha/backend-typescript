import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { AppState } from "../types";
import BackButton from "../components/BackButton";

const Product = () => {
  const { id } = useParams();
  const history = useHistory();

  const { allProducts } = useSelector((state: AppState) => state.product);
  const [product] = allProducts.filter((p) => p.name.toLowerCase() === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <BackButton handleGoBackClick={() => history.goBack()} />
      <h1>Product page</h1>
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
            {/* <button
                    className="ui teal basic button"
                    onClick={() => dispatch(removeProduct(product))}
                  >
                    Cancel
                  </button> */}
          </p>
        </div>
      </div>
    </>
  );
};

export default Product;
