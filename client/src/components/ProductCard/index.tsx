import React from "react";
import { Product } from "../../types";

import CartButton from "../CartButton";

const style = { width: "30%", marginBottom: "20px" };

const ProductCard = ({
  name,
  imageCover,
  duration,
  description,
  difficulty,
  price,
}: Product) => {
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
          <CartButton />
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
