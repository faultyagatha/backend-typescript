import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

import GoogleAuth from "../GoogleAuth";
import CartButton from "../CartButton";

const Menu = () => {
  // return (
  //   <>
  //     <nav className="navbar navbar-default" role="navigation">
  //       <ul className="nav navbar-nav navbar-left">
  //         <Link to="/about">
  //           <li>ABOUT</li>
  //         </Link>
  //       </ul>
  //       <ul className="nav navbar-nav navbar-right">
  //         <Link to="/signup">
  //           <li className="nav-item">
  //             <button type="button" className="btn btn-default navbar-btn">
  //               SIGNUP
  //             </button>
  //           </li>
  //         </Link>
  //         <Link to="/login">
  //           <li className="nav-item">
  //             <button type="button" className="btn btn-default navbar-btn">
  //               LOGIN
  //             </button>
  //           </li>
  //         </Link>
  //         <li className="nav-item">
  //           <CartButton />
  //         </li>
  //         {/* <li className="nav-item">
  //           <GoogleAuth />
  //         </li> */}
  //       </ul>
  //     </nav>
  //   </>
  // );
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
              <Link to="/login">
                <Nav.Link href="#link">
                  <i className="fa fa-user"></i>Login
                </Nav.Link>
              </Link>
              <Link to="/signup">
                <Nav.Link href="#link">Signup</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Menu;
