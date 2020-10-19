import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import FormContainer from "../components/Form";
import { updateProductByAdmin } from "../redux/actions/product";
import { AppState } from "../types";

const UpdateProductAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { allProducts } = useSelector((state: AppState) => state.product);
  const { error } = useSelector((state: AppState) => state.error);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [price, setPrice] = useState(0);
  const [imageCover, setImageCover] = useState("");
  const [message, setMessage] = useState("");

  const [productToUpdate] = allProducts.filter((product) => product._id === id);
  const _id = productToUpdate._id;

  useEffect(() => {
    if (productToUpdate.name) setName(productToUpdate.name);
    if (productToUpdate.description)
      setDescription(productToUpdate.description);
    if (productToUpdate.duration) setDuration(productToUpdate.duration);
    if (productToUpdate.difficulty) setDifficulty(productToUpdate.difficulty);
    if (productToUpdate.price) setPrice(productToUpdate.price);
    if (productToUpdate.imageCover) setImageCover(productToUpdate.imageCover);
  }, [dispatch, id, productToUpdate]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMessage("Product is updated");
    // history.push('/');
    dispatch(
      updateProductByAdmin({
        _id,
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
          <Form.Group controlId="imageCover">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control
              type="imageCover"
              placeholder="Enter product Image to update"
              value={imageCover}
              onChange={(e) => setImageCover(e.target.value)}
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
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="price"
              placeholder="Enter product price to update"
              value={price}
              // onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UpdateProductAdmin;
