import React from "react";

import { GoBackBtn } from "../../types";

const GoBackButton = ({ handleGoBackClick }: GoBackBtn) => {
  return (
    <button className="btn btn-primary" onClick={handleGoBackClick}>
      BACK
    </button>
  );
};

export default GoBackButton;
