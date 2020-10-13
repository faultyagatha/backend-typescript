import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

import { AppState, Product } from "../types";
import { removeProductFromCart } from "../redux/actions";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { inCart } = useSelector((state: AppState) => state.product);

  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeProductFromCart(product));
  };

  const handleCheckout = () => {
    console.log("checkout");
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Continue Shopping
      </Link>
      <Row className="py-3">
        <Col md={8}>
          <h3 className="text-center">
            {`You have ${inCart.length} items in your cart`}
          </h3>
          <ListGroup variant="flush">
            {inCart.map((product) => {
              return (
                <ListGroup.Item key={product.name}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={product.imageCover}
                        alt={product.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${product.name.toLowerCase()}`}>
                        {product.name}
                      </Link>
                    </Col>
                    <Col md={3}>{product.description}</Col>
                    <Col md={2}>{`Duration: ${product.duration} hours`}</Col>
                    <Col md={2}>{`Difficulty: ${product.difficulty}`}</Col>
                    <Col md={2}>{`Price: ${product.price}€`}</Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => handleRemoveFromCart(product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{`Your total: ${inCart.length} items`}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={inCart.length === 0}
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
