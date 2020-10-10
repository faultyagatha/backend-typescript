import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import { AppState } from "../types";
import { signUpUser } from "../redux/actions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import GoogleAuth from "../components/GoogleAuth";
import FormContainer from "../components/Form";

const SignUp = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state: AppState) => state.user);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [passwordConfirm, setPaswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [history, user]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setMessage("Passwords do not match");
    }

    dispatch(signUpUser());
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPasword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: any) => {
    setPaswordConfirm(e.target.value);
  };

  return (
    <>
      <FormContainer>
        <h1>Sign Up</h1>
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
            Sign Up
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            <GoogleAuth />
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <Link to="/login">Already a customer? </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default SignUp;
