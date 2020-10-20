import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import { AppState } from "../types";
import { updateUserData } from "../redux/actions";
import Message from "../components/Message";
import GoBack from "../components/BackButton";

const User = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state: AppState) => state.user);
  const { error } = useSelector((state: AppState) => state.error);

  const history = useHistory();
  const { id } = useParams();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    } else {
      if (user.email) setEmail(user.email);
      if (user.firstName) setFirstName(user.firstName);
      if (user.lastName) setLastName(user.lastName);
    }
  }, [dispatch, history, user, error, id, isLoggedIn]);

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

  return (
    <>
      <GoBack>Go Back</GoBack>
      <Row>
        <Col md={3}>
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
        <Col md={9}>
          <h2>My Orders</h2>
        </Col>
      </Row>
    </>
  );
};

export default User;
