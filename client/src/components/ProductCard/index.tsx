import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { Product } from "../../types";

const ProductCard = ({
  _id,
  name,
  imageCover,
  duration,
  description,
  distance,
  price,
}: Product) => {
  return (
    <Card className="my-3 p-3 rounded" key={name}>
      <Card.Img src={imageCover} variant="top" />
      <Card.Body>
        <Link to={`products/${name.toLowerCase()}`}>
          <Card.Title as="h4">
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">{description}</div>
        </Card.Text>
        <Card.Text as="div">
          <div className="my-3">{`Experience: ${duration} hours`}</div>
        </Card.Text>
        <Card.Text as="div">
          <div className="my-3">{`Earth: ${distance}`}</div>
        </Card.Text>
        <Card.Text as="h5">{`Price: ${price}€`}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
