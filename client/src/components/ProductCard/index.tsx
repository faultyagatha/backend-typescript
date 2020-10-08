import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addProduct } from "../../redux/actions";
import { Product, AppState } from "../../types";
import AddToCartButton from "../AddToCartButton";

const style = { width: "30%", marginBottom: "20px" };

const ProductCard = ({
  id,
  name,
  imageCover,
  duration,
  description,
  difficulty,
  price,
}: Product) => {
  const dispatch = useDispatch();

  const { inCart } = useSelector((state: AppState) => state.product);

  const handleClick = () => {
    dispatch(
      addProduct({
        id,
        name,
        imageCover,
        description,
        difficulty,
        duration,
        price,
      })
    );
  };

  let isDisabled: boolean = inCart.find((c) => c.name === name) ? true : false;

  return (
    <div className="card rounded" style={style} key={name}>
      <p className="card-img-top">{imageCover}</p>
      <div className="card-body text-center">
        <Link to={`products/${name.toLowerCase()}`}>
          <h5 className="card-title">{name}</h5>
        </Link>
        <h6 className="card-subtitle mb-2 text-muted">{description}</h6>
        <p className="card-text">{`Duration: ${duration} hours`}</p>
        <p>{`Difficulty: ${difficulty}`}</p>
        <p>{`Price: ${price}€`}</p>
        <p>
          <AddToCartButton handleClick={handleClick} isDisabled={isDisabled} />
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
