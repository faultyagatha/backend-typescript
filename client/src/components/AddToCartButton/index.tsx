import React from "react";

import { AddToCartBtn } from "../../types";

const AddToCartButton = ({ handleClick, isDisabled }: AddToCartBtn) => {
  if (isDisabled) {
    //TODO: disable
    return (
      <button className="btn btn-outline-secondary">
        <i className="fa fa-shopping-cart"></i>
      </button>
    );
  }
  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={handleClick}
    >
      <i className="fa fa-shopping-cart"></i>
    </button>
  );
};

export default AddToCartButton;
