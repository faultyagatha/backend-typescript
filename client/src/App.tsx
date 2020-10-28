import React from "react";
import { Container } from "react-bootstrap";

import Routes from "./Routes";

export default function App() {
  return (
    <>
      <Container className="py-3 px-5" fluid>
        <Routes />
      </Container>
    </>
  );
}
