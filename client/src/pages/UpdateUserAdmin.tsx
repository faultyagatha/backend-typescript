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

  const { user, allUsers, success } = useSelector(
    (state: AppState) => state.user
  );
  const { error } = useSelector((state: AppState) => state.error);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [userToUpdate] = allUsers.filter((user) => user._id === id);
  console.log(userToUpdate);

  //if (!userToUpdate) return <div>User not found</div>

  useEffect(() => {
    if (user.firstName) setFirstName(user.firstName);
    if (user.lastName) setLastName(user.lastName);
    if (user.email) setEmail(user.email);
    if (user.isAdmin) setIsAdmin(user.isAdmin);
  }, [dispatch, id, userToUpdate, success, user.firstName, user.lastName, user.email, user.isAdmin]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateUserByAdmin({ email, isAdmin, firstName, lastName }));
  };

  return (
    <>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="firstName"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="lastName"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
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
