import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

import { AppState } from "../../types";
import { logoutUser } from "../../redux/actions";

const Menu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state: AppState) => state.user);
  user ? console.log(user) : console.log("no user");

  const logoutHandler = () => {
    console.log(user);
    dispatch(logoutUser());
    history.push("/signup");
  };

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/cart">
                <i className="fa fa-shopping-cart"></i>Cart
              </Nav.Link>
              {user.email ? (
                <NavDropdown title="Hello" id="name">
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    <i className="fa fa-user" />
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Signup
                  </Nav.Link>
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
