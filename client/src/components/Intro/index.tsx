import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Carousel, Row, Col } from "react-bootstrap";

const Intro = () => {
  const history = useHistory();
  return (
    <>
      <Carousel className="my-3">
        <Carousel.Item>
          <img
            className="rounded mx-auto d-block w-100"
            src="/images/splash-short2.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <p className="splash-bold">STEP 1 </p>
            <p className="splash">Choose your planet and place your order</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="rounded mx-auto d-block w-100"
            src="/images/splash-short1.png"
            alt="Second slide"
          />
          <Carousel.Caption>
            <p className="splash-bold">STEP 2 </p>
            <p className="splash">Follow the instructions sent to your email</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="rounded mx-auto d-block w-100"
            src="/images/splash-short3.png"
            alt="Third slide"
          />
          <Carousel.Caption>
            <p className="splash-bold">STEP 3 </p>
            <p className="splash">
              Get ready for a breathtaking journey to the outer space
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Row className="py-3 justify-content-md-center">
        <Col md={2}>
          <Button
            className="btn-block"
            type="button"
            variant="info"
            onClick={() => history.push("/products")}
          >
            EXPLORE
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Intro;
