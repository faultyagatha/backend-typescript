import React from "react";

import Menu from "../components/Menu";
import Products from "./Products";

export default function Home() {
  return (
    <>
      <Menu />
      <Products />
      {/* <h1 className="text-center">Welcome to our shop</h1> */}
    </>
  );
}
