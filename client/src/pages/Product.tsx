import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, Image, ListGroup, Button } from "react-bootstrap";

import { AppState, ParamsType } from "../types";
import { addProductToCart, addProductToUser } from "../redux/actions";
import Message from "../components/Message";

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams<ParamsType>();
  const history = useHistory();
  const { isLoggedIn } = useSelector((state: AppState) => state.user);
  const { allProducts } = useSelector((state: AppState) => state.product);
  const [product] = allProducts.filter((p) => p.name.toLowerCase() === id);
  const [message, setMessage] = useState("");

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    history.push(`/cart/${id}`);
    dispatch(addProductToCart(product));
  };

  const handleAddToWishlist = () => {
    dispatch(addProductToUser(product));
    setMessage("The planet is added to your wishlist");
  };

  return (
    <div className="m-5">
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <h1>Planet</h1>
      {message && <Message variant="info">{message}</Message>}
      <Row>
        <Col md={6}>
          <Image src={product.imageCover} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>{`Duration: ${product.duration} hours`}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>{`Distance from Earth: ${product.distance}`}</strong>
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}€</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  variant="info"
                  type="button"
                  disabled={!isLoggedIn}
                  onClick={handleAddToWishlist}
                >
                  Save to Wishlist
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Product;
