import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { useApiRequest } from "../../hooks";
import { loginUser } from "../../redux/actions";

//TODO: refactor with actions
const Login = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const { doRequest, errors } = useApiRequest({
    url: "http://localhost:5000/api/v1/users/login",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => history.push("/"),
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    doRequest();
    // dispatch(loginUser);
  };
  return (
    <div>
      <form className="navbar-form navbar-center" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-default">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
