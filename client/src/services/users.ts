import axios from "axios";

const rootURL = "http://localhost:5000/api/v1/users";

export const signUpReq = async () => {
  return await axios.post(`${rootURL}/signup`);
};

export const logInReq = async () => {
  return await axios.post(`${rootURL}/login`);
};
