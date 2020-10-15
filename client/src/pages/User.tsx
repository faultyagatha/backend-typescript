import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import { AppState } from "../types";
import { getUserData, updateUserData } from "../redux/actions";
import Message from "../components/Message";

const User = () => {
  const dispatch = useDispatch();
  const { user, success } = useSelector((state: AppState) => state.user);
  const { error } = useSelector((state: AppState) => state.error);
  const history = useHistory();
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      if (!user.email) {
        dispatch(getUserData("profile"));
      } else {
        setEmail(user.email);
        if (user.firstName) setFirstName(user.firstName);
        if (user.lastName) setLastName(user.lastName);
      }
    }
  }, [dispatch, history, user, error]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setMessage("Passwords do not match");
    }
    dispatch(
      updateUserData({ email, password, passwordConfirm, firstName, lastName })
    );
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: any) => {
    setPasswordConfirm(e.target.value);
  };

  const handleFirstNameChange = (e: any) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: any) => {
    setLastName(e.target.value);
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <h2>My Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
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
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password}
                onChange={handlePasswordChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="passwordConfirm">
              <Form.Label>Cofirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirm password"
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
              ></Form.Control>
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
