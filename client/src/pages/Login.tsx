import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import { AppState } from "../types";
import { loginUser } from "../redux/actions";
import GoBack from "../components/BackButton";
import Message from "../components/Message";
import GoogleAuth from "../components/GoogleAuth";
import FormContainer from "../components/Form";

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.user);
  const { error } = useSelector((state: AppState) => state.ui);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  useEffect(() => {
    if (user.email) {
      history.push("/");
    }
  }, [history, user, error]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPasword(e.target.value);
  };

  return (
    <>
      <GoBack linkStr="/">Go Back</GoBack>
      <FormContainer>
        <h1>Login</h1>
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
          <Button type="submit" variant="primary">
            Login
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            <GoogleAuth />
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <Link to="/signup">New customer? </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default Login;
