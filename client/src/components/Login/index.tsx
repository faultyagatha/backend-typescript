import React from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "../../redux/actions";

//TODO: create user functionality
const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginUser);
    console.log(loginUser);
  };
  return (
    <div>
      <form className="navbar-form navbar-center" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-control" />
        </div>
        <button type="submit" className="btn btn-default">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
