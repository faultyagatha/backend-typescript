import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import { getAllUsers, deleteUser } from "../redux/actions";
import { AppState } from "../types";

const AllUsers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { allUsers, user } = useSelector((state: AppState) => state.user);
  const { error } = useSelector((state: AppState) => state.error);

  useEffect(() => {
    if (!user) {
      console.log("no user");
      history.push("/login");
    } else if (user.isAdmin) {
      dispatch(getAllUsers());
    } else {
      history.push("/");
    }
    dispatch(getAllUsers());
  }, [dispatch, history, user]);

  const handleDeleteUser = (id: string | undefined) => {
    if (!id) {
      console.log("no id passed");
      return;
    }
    console.log(id);
    dispatch(deleteUser(id));
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <h1>Users</h1>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AllUsers;
