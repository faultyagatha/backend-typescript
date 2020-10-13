import React from "react";
import { Alert } from "react-bootstrap";

import { MessageType } from "../../types";

const Message: MessageType = ({ variant = "info", children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
