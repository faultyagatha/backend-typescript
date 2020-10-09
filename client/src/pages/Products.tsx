import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { AppState } from "../types";
import { useProducts } from "../hooks";
import { fetchProducts } from "../redux/actions";
import ProductCard from "../components/ProductCard";

//TODO: ADD LOADER spinner

export default function Products() {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state: AppState) => state.product);
  useProducts();
  dispatch(fetchProducts);

  if (!allProducts) {
    return <div>Product not found</div>;
  }

  const renderProducts = () => {
    return allProducts.map((product) => {
      return (
        <Col sm={12} md={6} lg={4} xl={3}>
          <ProductCard
            // key={product.id}
            key={product.name}
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
      <Row>
        {renderProducts()}
        {/* {allProducts.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <ProductCard
              // key={product.id}
              key={product.name}
              name={product.name}
              imageCover={product.imageCover}
              description={product.description}
              duration={product.duration}
              difficulty={product.difficulty}
              price={product.price}
            />
          </Col>
        )
        )}; */}
      </Row>
    </>
  );
}
