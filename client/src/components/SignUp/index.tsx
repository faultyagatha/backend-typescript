import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { loginUser } from "../../redux/actions";
import { response } from "express";

//TODO: refactor and add fill property on each of the fields for errors <input fill='' >
const SignUpForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState<any[]>([]);
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // dispatch(signinUser());
    // console.log(loginUser);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/signup",
        {
          userName,
          email,
          password,
          passwordConfirm,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(errors);
      setErrors(err.response.data.errors);
    }
  };
  return (
    <div>
      <form className="navbar-form navbar-center" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
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
        {errors.length > 0 && (
          <div className="alert alert-danger">
            <h4> Oopsy... </h4>
            <ul className="my-0">
              {errors.map((err) => (
                <li key={Math.random()}> {err.message} </li>
              ))}
            </ul>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
