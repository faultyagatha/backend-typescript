import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, Image, ListGroup, Button } from "react-bootstrap";

import { AppState } from "../types";
import { addProductToCart } from "../redux/actions";

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const { allProducts } = useSelector((state: AppState) => state.product);
  const [product] = allProducts.filter((p) => p.name.toLowerCase() === id);

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    history.push(`/cart/${id}`);
    dispatch(addProductToCart(product));
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <h1>Product</h1>
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
                <Button
                  className="btn-block"
                  type="button"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Product;
