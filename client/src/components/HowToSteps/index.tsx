import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import { StepsType } from "../../types";

const HowToSteps: StepsType = ({ step1, step2, step3 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <Nav.Link as={Link} to="/products">
            Choose your experience
          </Nav.Link>
        ) : (
          <Nav.Link as={Link} to="/products">
            Don't Choose your experience
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Nav.Link as={Link} to="/products">
            Choose your experience
          </Nav.Link>
        ) : (
          <Nav.Link as={Link} to="/products">
            Don't Choose your experience
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default HowToSteps;
