import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import axios from "axios";

import { loginWithGoogle } from "../../redux/actions";

const rootURL = "http://localhost:5000/api/v1/users";
const clientId =
  "66461290434-jd6st0fq3gulg1rpi1dchp9ll42hnsl5.apps.googleusercontent.com";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const handleResponse = async (response: any) => {
    // console.log("from google: ", response);
    try {
      const { data } = await axios.post(`${rootURL}/login/google`, {
        id_token: response.tokenObj.id_token,
      });

      console.log("trying to login from client", data);
      dispatch(loginWithGoogle(data));
    } catch (err) {
      console.log(err.response);
      console.log("client axios error: ", err);
    }
  };
  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={handleResponse}
        onFailure={handleResponse}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default GoogleAuth;
