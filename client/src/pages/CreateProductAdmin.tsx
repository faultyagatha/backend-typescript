import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import FormContainer from "../components/Form";
import { createProductByAdmin } from "../redux/actions/product";
import { AppState } from "../types";

const CreateProductsAdmin = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: AppState) => state.error);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState("");
  const [price, setPrice] = useState(0);
  const [imageCover, setImageCover] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMessage("Product is created");
    dispatch(
      createProductByAdmin({
        name,
        description,
        duration,
        distance,
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
        <h1>New Product</h1>
        {message && <Message variant="success">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter product name to create"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="imageCover">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="imageCover"
              placeholder="Enter product image to create"
              value={imageCover}
              onChange={(e) => setImageCover(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="description"
              placeholder="Enter product description to create"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="duration"
              placeholder="Enter product duration to create"
              value={duration}
              onChange={(e) =>
                setDuration((e.target.value as unknown) as number)
              }
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="duration">
            <Form.Label>Distance from Earth</Form.Label>
            <Form.Control
              type="distance"
              placeholder="Enter product distance to create"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="price"
              placeholder="Enter product price to create"
              value={price}
              onChange={(e) => setPrice((e.target.value as unknown) as number)}
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
