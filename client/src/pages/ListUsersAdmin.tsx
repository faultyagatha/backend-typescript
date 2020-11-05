import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { getAllUsersByAdmin, deleteUserByAdmin } from "../redux/actions";
import { AppState } from "../types";

const ListUsersAdmin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { allUsers, user } = useSelector((state: AppState) => state.user);
  const { error, isLoading } = useSelector((state: AppState) => state.ui);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else if (user.isAdmin) {
      dispatch(getAllUsersByAdmin());
    } else {
      history.push("/");
    }
  }, [dispatch, history, user]);

  const handleDeleteUser = (id: string | undefined) => {
    if (!id) {
      console.log("no id passed");
      return;
    }
    if (window.confirm("Are you sure?")) {
      setMessage("User is deleted.");
      dispatch(deleteUserByAdmin(id));
      dispatch(getAllUsersByAdmin());
    }
  };

  if (!allUsers) {
    return <Loader />;
  }

  return (
    <div className="m-5">
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <h1>Users</h1>
      {message && <Message variant="success">{message}</Message>}
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>EMAIL</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/admin/users/${user._id}`}>
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
    </div>
  );
};

export default ListUsersAdmin;
