import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import { AppState } from "../types";
import { signUpUser } from "../redux/actions";
import Message from "../components/Message";
import FormContainer from "../components/Form";

const SignUp = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.user);
  const { error } = useSelector((state: AppState) => state.error);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user.email) {
      history.push("/");
    }
  }, [history, user.email, error]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setMessage("Passwords do not match");
    }
    console.log(email, password, passwordConfirm);
    dispatch(signUpUser(email, password, passwordConfirm));
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
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
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
            <Link to="/login">Already a customer? </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default SignUp;
