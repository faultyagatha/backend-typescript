import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import GoBack from "../components/BackButton";

const About = () => {
  return (
    <Container className="py-5 d-flex align-items-stretch">
      <Row className="py-5">
        <Col md={8}>
          <GoBack>
            <h3 className="text-center">
              I've known adventures, seen places you people will never see, I've
              been Offworld and back… frontiers!
            </h3>
          </GoBack>
        </Col>
      </Row>
      <Row className="py-5 justify-content-md-center">
        <Col md={8}>
          <GoBack>
            <h3 className="text-center">
              I've stood on the back deck of a blinker bound for the Plutition
              Camps with sweat in my eyes watching stars fight on the shoulder
              of Orion...
            </h3>
          </GoBack>
        </Col>
      </Row>
      <Row className="py-5 justify-content-md-center">
        <Col md={8}>
          <GoBack>
            <h3 className="text-center">
              I’ve felt wind in my hair, riding test boats off the black
              galaxies and seen an attack fleet burn like a match and disappear.
              I've seen it, felt it...!
            </h3>
          </GoBack>
        </Col>
      </Row>
      {/* <Row className="py-3 justify-content-md-center">
        <Col md={6}>
          <GoBack>
            EXPERIENCE.  FEEL.  DREAM.
            EXPERIENCE.  FEEL.  DREAM.
            EXPERIENCE.  FEEL.  DREAM.
            EXPERIENCE.  FEEL.  DREAM.
            EXPERIENCE.  FEEL.  DREAM.
            EXPERIENCE.  FEEL.  DREAM.
            EXPERIENCE.  FEEL.  DREAM.
          </GoBack>
        </Col>
      </Row> */}
    </Container>
  );
};

export default About;
