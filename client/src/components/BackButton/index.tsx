import React from "react";

import { WithChildren } from "../../types";
import { Link } from "react-router-dom";

// const GoBackButton = ({ handleGoBackClick }: GoBackBtn) => {
//   return (
//     <button className="btn btn-primary" onClick={handleGoBackClick}>
//       BACK
//     </button>
//   );
// };

const GoBack: WithChildren = ({ children }) => {
  return (
    <Link className="btn btn-light my-3" to="/">
      {children}
    </Link>
  );
};

export default GoBack;
