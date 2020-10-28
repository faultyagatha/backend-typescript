import React, { useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

import Message from "../components/Message";
import GoBack from "../components/BackButton";
import { AppState } from "../types";

const Checkout = () => {
  const history = useHistory();
  const { user } = useSelector((state: AppState) => state.user);
  const { error } = useSelector((state: AppState) => state.error);
  const { inCart } = useSelector((state: AppState) => state.product);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [history, user]);

  return (
    <div className="m-5">
      <GoBack>Continue Shopping</GoBack>
      {error && <Message variant="danger">{error}</Message>}
      <h1>Place Your Order</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Send To</h2>
              <p>
                <strong>First Name: </strong> {user.firstName}
              </p>
              <p>
                <strong>Last Name: </strong> {user.lastName}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Pay With</h2>
              <p>
                <strong>Method: </strong> Choose from the avaiable methods
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Your Items</h2>
              {inCart.length === 0 ? (
                <Message variant="danger">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {inCart.map((item) => (
                    <ListGroup.Item key={item.name}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.imageCover}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.name.toLowerCase()}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>€{item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>ITEMS: </strong>
                  </Col>
                  <Col>{inCart.length}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>TOTAL: </strong>
                  </Col>
                  <Col>
                    €
                    {inCart
                      .map((item) => item.price)
                      .reduce((sum: number, price) => sum + price, 0)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <PayPalButton
                  amount={inCart.length}
                  onSuccess={() => console.log("payment was successful")}
                />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
