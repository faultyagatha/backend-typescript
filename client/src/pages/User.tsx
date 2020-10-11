import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import { AppState } from "../types";
import { getUserData } from "../redux/actions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const User = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state: AppState) => state.user);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      if (!user.email) {
        dispatch(getUserData("profile"));
      } else {
        setEmail(user.email);
      }
    }
  }, [dispatch, history, user]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setMessage("Passwords do not match");
    }
    console.log(email, password, passwordConfirm);
    //DISPATCH UPDATE PROFILE
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

  return (
    <>
      <Row>
        <Col md={3}>
          <h2>My Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
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
