import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import { WithChildren } from "../../types";

const FormContainer: WithChildren = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
