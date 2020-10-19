import React, { useState, useEffect } from "react";
import axios from "axios";
// import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useHistory } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import { AppState } from "../types";

const Checkout = () => {
  const dispatch = useDispatch();
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
    <>
      {error && <Message variant="danger">{error}</Message>}
      <h1>Place Your Order</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Send To</h2>
              <p>
                <strong>Name: </strong> {user.firstName}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Pay With</h2>
              <p>
                <strong>Method: </strong>
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
                        <Col md={3}>
                          <Image
                            src={item.imageCover}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.name}`}>{item.name}</Link>
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
                  <Col>Items</Col>
                  {/* <Col>${order.itemsPrice}</Col> */}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  {/* <Col>${order.totalPrice}</Col> */}
                </Row>
              </ListGroup.Item>
              {/* {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                </ListGroup.Item>
              )} */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Checkout;
