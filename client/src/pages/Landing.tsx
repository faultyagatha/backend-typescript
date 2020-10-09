import React from "react";
import { CurrentUser } from "../types";

type LandingPage = ({ currentUser }: { currentUser: CurrentUser }) => any;

const Landing: LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in</h1> : <h1>You are signed in</h1>;
};

export default Landing;
