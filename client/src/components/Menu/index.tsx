import React from "react";

import CartButton from "../CartButton";

const Menu = () => {
  return (
    <ul className="ui secondary  menu">
      <li className="item">Some item</li>
      <div className="right menu">
        <a className="item">
          <CartButton />
        </a>
        <a className="item">Some item</a>
      </div>
    </ul>
  );
};

export default Menu;
