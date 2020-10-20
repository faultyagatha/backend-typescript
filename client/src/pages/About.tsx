import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import GoBack from "../components/BackButton";

const About = () => {
  return (
    <Container>
      <Row className="py-3 justify-content-md-center">
        <Col md={6}>
          <h3 className="text-center">Welcome to our store!</h3>
        </Col>
      </Row>
      <Row className="py-3 justify-content-md-center">
        <Col md={6}>
          <h3 className="text-center">
            We are offering to you experience that you've never seen before.
          </h3>
        </Col>
      </Row>
      <Row className="py-3 justify-content-md-center">
        <Col md={6}>
          <h3 className="text-center">
            Have you ever wanted to try something new?
          </h3>
        </Col>
      </Row>
      <Row className="py-3 justify-content-md-center">
        <Col md={6}>
          <GoBack>
            <Button type="button" className="btn-block">
              JUST DO IT
            </Button>
          </GoBack>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
