import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  const style = {
    margin: "auto",
    display: "block",
  };
  return (
    <Spinner animation="border" role="status" style={style}>
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
