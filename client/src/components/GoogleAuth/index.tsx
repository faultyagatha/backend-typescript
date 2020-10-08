import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import axios from "axios";

import { loginWithGoogle, googleLogin } from "../../redux/actions";

const rootURL = "http://localhost:5000/api/v1/users";
const clientId =
  "66461290434-jd6st0fq3gulg1rpi1dchp9ll42hnsl5.apps.googleusercontent.com";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const handleResponse = async (response: any) => {
    console.log(response);
    // dispatch(loginWithGoogle(response))
    let res = await axios.post(`${rootURL}/login/google`, {
      id_token: response.tokenObj.id_token,
    });
    console.log(res);
    dispatch(googleLogin(res.data));
    localStorage.setItem("token", res.data.token);
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
