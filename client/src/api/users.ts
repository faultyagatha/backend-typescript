import axios from "axios";

/** include a token for each req to identify
 * itself to the server */

const rootURL = "http://localhost:5000/api/v1/users";

//TODO
export const signUpReq = async () => {
  return await axios.post(`${rootURL}/signup`);
};

//TODO
export const logInReq = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.post(`${rootURL}/login`, config);
};

export const loginGoogleReq = async () => {
  let token = localStorage.getItem("auth_token");
  const config = {
    headers: token,
  };
  console.log("token: ", token, "config: ", config);
  return await axios.post(`${rootURL}/googleLogin`, config);
};
