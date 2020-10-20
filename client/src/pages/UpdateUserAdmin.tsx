import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import FormContainer from "../components/Form";
import { updateUserByAdmin } from "../redux/actions/users";
import { AppState } from "../types";

const UpdateUserAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { allUsers } = useSelector((state: AppState) => state.user);
  const { error } = useSelector((state: AppState) => state.error);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");

  const [userToUpdate] = allUsers.filter((user) => user._id === id);
  // console.log(userToUpdate);
  const _id = userToUpdate._id;

  useEffect(() => {
    if (userToUpdate.firstName) setFirstName(userToUpdate.firstName);
    if (userToUpdate.lastName) setLastName(userToUpdate.lastName);
    if (userToUpdate.email) setEmail(userToUpdate.email);
    if (userToUpdate.isAdmin) setIsAdmin(userToUpdate.isAdmin);
  }, [dispatch, id, userToUpdate]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMessage("User profile is updated");
    if (!_id) return;
    dispatch(updateUserByAdmin(_id, email, firstName, lastName));
  };

  return (
    <>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Update User</h1>
        {message && <Message variant="success">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="firstName"
              placeholder="Enter first name to update"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="lastName"
              placeholder="Enter last name to update"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email to update"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="isadmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e: any) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UpdateUserAdmin;
