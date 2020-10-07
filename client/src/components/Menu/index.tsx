import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <nav className="navbar navbar-default" role="navigation">
        <ul className="nav navbar-nav navbar-left">
          <Link to="/about">
            <li>ABOUT</li>
          </Link>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <Link to="/signup">
            <li className="nav-item">
              <button type="button" className="btn btn-default navbar-btn">
                SIGNUP
              </button>
            </li>
          </Link>
          <Link to="/login">
            <li className="nav-item">
              <button type="button" className="btn btn-default navbar-btn">
                LOGIN
              </button>
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
