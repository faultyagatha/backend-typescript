import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProduct } from "../../redux/actions";
import { Product, AppState } from "../../types";
import AddToCartButton from "../AddToCartButton";

const style = { width: "30%", marginBottom: "20px" };

const ProductCard = ({
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
    <div className="card" style={style} key={name}>
      <p className="card-img-top">{imageCover}</p>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{description}</h6>
        <p className="card-text">{duration}</p>
        <p>{difficulty}</p>
        <p>{price}</p>
        <p>
          <AddToCartButton handleClick={handleClick} isDisabled={isDisabled} />
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
