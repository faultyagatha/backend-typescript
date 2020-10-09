import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, Image, ListGroup, Button } from "react-bootstrap";

import { AppState } from "../types";
import BackButton from "../components/BackButton";

const Product = () => {
  const { id } = useParams();
  const history = useHistory();

  const { allProducts } = useSelector((state: AppState) => state.product);
  const [product] = allProducts.filter((p) => p.name.toLowerCase() === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    // <>
    //   <BackButton handleGoBackClick={() => history.goBack()} />
    //   <h1>Product page</h1>
    //   <div className="card rounded" key={product.name}>
    //     <p className="card-img-top">{product.imageCover}</p>
    //     <div className="card-body text-center">
    //       <h5 className="card-title">{product.name}</h5>
    //       <h6 className="card-subtitle mb-2 text-muted">
    //         {product.description}
    //       </h6>
    //       <p className="card-text">{`Duration: ${product.duration} hours`}</p>
    //       <p>{`Difficulty: ${product.difficulty}`}</p>
    //       <p>{`Price: ${product.price}€`}</p>
    //       <p>
    //         {/* <button
    //                 className="ui teal basic button"
    //                 onClick={() => dispatch(removeProduct(product))}
    //               >
    //                 Cancel
    //               </button> */}
    //       </p>
    //     </div>
    //   </div>
    // </>
    <>
      <BackButton handleGoBackClick={() => history.goBack()} />
      <h1>Product page</h1>
      <Row>
        <Col md={6}>
          <Image src={product.imageCover} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>{`Duration: ${product.duration} hours`}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>{`Difficulty: ${product.difficulty}`}</strong>
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}€</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-block" type="button">
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* <button
                    className="ui teal basic button"
                    onClick={() => dispatch(removeProduct(product))}
                  >
                    Cancel
                  </button> */}
      </Row>
    </>
  );
};

export default Product;
