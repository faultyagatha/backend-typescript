import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { AppState } from "../types";
import { fetchProducts } from "../redux/actions";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function Products() {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector(
    (state: AppState) => state.product
  );
  const { error } = useSelector((state: AppState) => state.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!allProducts) {
    return <Loader />;
  }

  const renderProducts = () => {
    return allProducts.map((product) => {
      return (
        <Col sm={12} md={6} lg={4} xl={3} key={product.name}>
          <ProductCard
            _id={product._id}
            key={product._id}
            name={product.name}
            imageCover={product.imageCover}
            description={product.description}
            duration={product.duration}
            difficulty={product.difficulty}
            price={product.price}
          />
        </Col>
      );
    });
  };
  return (
    <>
      <h1 className="text-center">In Store</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        // {error && <Message variant="danger">{error}</Message>}
        <Row>{renderProducts()}</Row>
      )}
    </>
  );
}
