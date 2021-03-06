import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";

import { AppState } from "../../types";
import { logoutUser, removeAllFromCart } from "../../redux/actions";

const Menu = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isLoggedIn } = useSelector((state: AppState) => state.user);
  const { inCart } = useSelector((state: AppState) => state.product);

  const logoutHandler = () => {
    dispatch(logoutUser());
    if (inCart.length > 0) {
      dispatch(removeAllFromCart());
    }
    history.push("/signup");
  };

  return (
    <header>
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Planets
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/cart">
              <i className="fa fa-shopping-cart">
                <Badge className="badge-info">{inCart.length}</Badge>
              </i>
            </Nav.Link>
            {isLoggedIn ? (
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
            {isLoggedIn && user.isAdmin && (
              <NavDropdown title="Admin" id="admin">
                <NavDropdown.Item as={Link} to="/admin/users">
                  Users
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/products">
                  Products
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Menu;
