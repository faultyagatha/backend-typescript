import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useApiRequest } from "../../hooks";

//TODO: add fill property on each of the fields for errors <input fill='' >
const SignUpForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { doRequest, errors } = useApiRequest({
    url: "http://localhost:5000/api/v1/users/signup",
    method: "post",
    body: {
      email,
      password,
      passwordConfirm,
    },
    onSuccess: () => history.push("/products"), //TODO: add modal or some landing page for better UI
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    doRequest();
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password Confirmation</label>
          <input
            className="form-control"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        {errors}
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
