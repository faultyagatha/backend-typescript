import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";

import { AppState, Product } from "../types";
import { removeProductFromCart } from "../redux/actions";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { inCart } = useSelector((state: AppState) => state.product);
  const { isLoggedIn } = useSelector((state: AppState) => state.user);

  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeProductFromCart(product));
  };

  const handleCheckout = () => {
    if (!isLoggedIn) history.push("/login");
    else history.push("/checkout");
  };

  return (
    <div className="m-5">
      <Link className="btn btn-light my-3" to="/">
        Continue Shopping
      </Link>
      <Row className="py-3">
        <Col md={8}>
          <h3>{`You have ${inCart.length} items in your cart`}</h3>
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
                    <Col md={2}>
                      <Link to={`/products/${product.name.toLowerCase()}`}>
                        {product.name}
                      </Link>
                    </Col>
                    <Col md={4}>{product.description}</Col>
                    <Col md={2}>{`${product.duration} hours`}</Col>
                    <Col md={1}>{`${product.price}€`}</Col>
                    <Col md={1}>
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
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>
                  {`Your total: €${inCart
                    .map((item) => item.price)
                    .reduce((sum: number, price) => {
                      return sum + price;
                    }, 0)}`}
                </h3>
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
    </div>
  );
};

export default Cart;
