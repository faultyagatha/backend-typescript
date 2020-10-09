import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";

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
    <Card className="my-3 p-3 rounded" key={name}>
      <Card.Img src={imageCover} variant="top" />
      <Card.Body>
        <Link to={`products/${name.toLowerCase()}`}>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">{description}</div>
        </Card.Text>
        <Card.Text as="div">
          <div className="my-3">{`Duration: ${duration} hours`}</div>
        </Card.Text>
        <Card.Text as="div">
          <div className="my-3">{`Difficulty: ${difficulty}`}</div>
        </Card.Text>
        <Card.Text as="h3">{`Price: ${price}€`}</Card.Text>
        {/* <button
                    className="ui teal basic button"
                    onClick={() => dispatch(removeProduct(product))}
                  >
                    Cancel
                  </button> */}
        <AddToCartButton handleClick={handleClick} isDisabled={isDisabled} />
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
