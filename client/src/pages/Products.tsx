import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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

  const style = { width: "30%", marginBottom: "20px" };

  const renderProducts = () => {
    return allProducts.map((product) => {
      return (
        <ProductCard
          key={product.name}
          id={product.id}
          name={product.name}
          imageCover={product.imageCover}
          description={product.description}
          duration={product.duration}
          difficulty={product.difficulty}
          price={product.price}
        />
      );
      //   <div
      //     className="card"
      //     style={style}
      //     key={product.name}>
      //     <p>{product.name}</p>
      //     <p>{product.imageCover}</p>
      //     <p>{product.duration}</p>
      //     <p>{product.difficulty}</p>
      //     <p>{product.description}</p>
      //     <p>{product.price}</p>
      //     {/* <h3> {product.description}</h3> */}
      //   </div>
      // )
    });
  };
  return (
    <>
      <h1 className="text-center">In Store</h1>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderProducts()}
      </div>
    </>
  );
}
