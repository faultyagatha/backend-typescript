import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { Form, Button, Row, Col, ListGroup, Image } from "react-bootstrap";

import { AppState, ParamsType, Product } from "../types";
import { updateUserData, removeProductFromUser } from "../redux/actions";
import Message from "../components/Message";
import GoBack from "../components/BackButton";

const User = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isLoggedIn } = useSelector((state: AppState) => state.user);
  const { products } = user;
  const { error } = useSelector((state: AppState) => state.error);

  console.log(user);

  console.log("USER FROM USER PAGE", user);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
    if (user) {
      console.log("USER FROM EFFECTS", user);
      if (user.email) setEmail(user.email);
      if (user.firstName) setFirstName(user.firstName);
      if (user.lastName) setLastName(user.lastName);
    }
  }, [dispatch, error, history, isLoggedIn, user]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMessage("Your profile is updated");
    history.push("/profile");
    dispatch(updateUserData(email, firstName, lastName));
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e: any) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: any) => {
    setLastName(e.target.value);
  };

  const handleRemoveWishList = (product: Product) => {
    dispatch(removeProductFromUser(product));
  };

  return (
    <div className="m-5">
      <GoBack>Go Back</GoBack>
      <Row>
        <Col md={5}>
          <h2>My Profile</h2>
          {message && <Message variant="success">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                onChange={handleEmailChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="firstName"
                placeholder="enter first name"
                value={firstName}
                onChange={handleFirstNameChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="lastName"
                placeholder="enter last name"
                value={lastName}
                onChange={handleLastNameChange}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>My Wishlist</h2>
          <ListGroup variant="flush">
            {products &&
              products.map((product) => {
                return (
                  <ListGroup.Item key={product.name}>
                    <Row>
                      <Col md={3}>
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
                      <Col md={1}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => handleRemoveWishList(product)}
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
      </Row>
    </div>
  );
};

export default User;
