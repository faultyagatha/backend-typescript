import React from "react";

import { NavButton } from "../../types";
import { Link } from "react-router-dom";

const GoBack: NavButton = ({ children, linkStr }) => {
  return (
    <Link className="btn btn-light my-3" to={linkStr}>
      {children}
    </Link>
  );
};

export default GoBack;
