import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { fetchProducts, deleteProductByAdmin } from "../redux/actions/product";
import { AppState } from "../types";

const ListProductsAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { allProducts } = useSelector((state: AppState) => state.product);
  const { user } = useSelector((state: AppState) => state.user);
  const { error } = useSelector((state: AppState) => state.ui);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/login");
    }
  }, [dispatch, user, allProducts, history]);

  const handleDeleteProduct = (id: string | undefined) => {
    if (!id) {
      console.log("no id passed");
      return;
    }
    if (window.confirm("Are you sure?")) {
      setMessage("Product is deleted.");
      dispatch(deleteProductByAdmin(id));
      dispatch(fetchProducts());
    }
  };

  if (!allProducts) {
    return <Loader />;
  }

  return (
    <div className="m-5">
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row className="align-item-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Link to={`/admin/create`}>
            <Button className="my-3">Create Product</Button>
          </Link>
        </Col>
      </Row>
      {message && <Message variant="success">{message}</Message>}
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>IMAGE</th>
              <th>DESCRIPTION</th>
              <th>DURATION</th>
              <th>DIFFICULTY</th>
              <th>PRICE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.imageCover}</td>
                <td>{product.description}</td>
                <td>{product.duration}</td>
                <td>{product.distance}</td>
                <td>{product.price}</td>
                <td>
                  <Link to={`/admin/products/${product._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ListProductsAdmin;
