import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import FormContainer from "../components/Form";
import { fetchProducts, createProductByAdmin } from "../redux/actions/product";
import { AppState, Product } from "../types";
import Products from "./Products";

const CreateProductsAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { allProducts } = useSelector((state: AppState) => state.product);
  const { error } = useSelector((state: AppState) => state.error);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [price, setPrice] = useState(0);
  const [imageCover, setImageCover] = useState("");
  const [message, setMessage] = useState("");

  // useEffect(() => {

  // }, [dispatch, allProducts]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMessage("Product is created");
    // history.push('/');
    dispatch(
      createProductByAdmin({
        name,
        description,
        duration,
        difficulty,
        price,
        imageCover,
      })
    );
  };

  return (
    <>
      <Link to="/admin/products" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Update Product</h1>
        {message && <Message variant="success">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter product name to update"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="description"
              placeholder="Enter product description to update"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="duration"
              placeholder="Enter product duration to update"
              value={duration}
              // onChange={(e) => setDuration(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="duration">
            <Form.Label>Difficulty</Form.Label>
            <Form.Control
              type="difficulty"
              placeholder="Enter product difficulty to update"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateProductsAdmin;