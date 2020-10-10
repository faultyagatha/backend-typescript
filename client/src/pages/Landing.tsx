import React from "react";
import { User } from "../types";

type LandingPage = ({ user }: { user: User }) => any;

const Landing: LandingPage = ({ user }) => {
  return user ? <h1>You are signed in</h1> : <h1>You are signed out</h1>;
};

export default Landing;
