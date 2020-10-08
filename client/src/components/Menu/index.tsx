import React from "react";
import { Link } from "react-router-dom";

import GoogleAuth from "../GoogleAuth";

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
          {/* <Link to="/signup">
            <li className="nav-item">
              <button type="button" className="btn btn-default navbar-btn">
                SIGNUP
              </button>
            </li>
          </Link>
          <Link to="/login">
          </Link> */}
          <li className="nav-item">
            <GoogleAuth />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
