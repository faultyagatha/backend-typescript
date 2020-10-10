import React from "react";
import { Alert } from "react-bootstrap";

type Message = ({
  variant,
  children,
}: {
  variant: string;
  children: any;
}) => JSX.Element;

const Message: Message = ({ variant = "info", children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

// Message.defaultProps = {
//   variant: 'info'
// }

export default Message;
