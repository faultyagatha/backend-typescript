import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";

import { AppState } from "../../types";
import { logoutUser } from "../../redux/actions";

const Menu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state: AppState) => state.user);

  const logoutHandler = () => {
    dispatch(logoutUser());
    history.push("/");
  };

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/">
                <Nav.Link href="#home">Home</Nav.Link>
              </Link>
              <Link to="/about">
                <Nav.Link href="#link">About</Nav.Link>
              </Link>
            </Nav>
            <Nav className="ml-auto">
              <Link to="/cart">
                <Nav.Link href="#link">
                  <i className="fa fa-shopping-cart"></i>Cart
                </Nav.Link>
              </Link>
              {user ? (
                <NavDropdown title="Hello" id="name">
                  <Link to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Link to="/login">
                    <Nav.Link href="#link">
                      <i className="fa fa-user"></i>Login
                    </Nav.Link>
                  </Link>
                  <Link to="/signup">
                    <Nav.Link href="#link">Signup</Nav.Link>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Menu;
