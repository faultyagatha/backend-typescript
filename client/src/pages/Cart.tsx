import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { AppState } from "../types";
// import { removeCountry } from '../redux/actions';
// import CountryFlag from '../components/Flag';
import BackButton from "../components/BackButton";
import { removeProduct } from "../redux/actions";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const productsInCart = useSelector((state: AppState) => state.product.inCart);

  return (
    <>
      <BackButton handleGoBackClick={() => history.goBack()} />
      <div className="ui two column stackable center aligned grid">
        <div className="middle aligned row">
          <div className="column">
            <h1>{`You have ${productsInCart.length} items in your cart`}</h1>
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
      <div className="cart">
        {productsInCart.map((product) => {
          return (
            <div className="ui two column centered grid" key={product.name}>
              <div className="column">
                <div className="ui massive middle aligned animated list">
                  <div className="item">
                    {/* <CountryFlag url={country.flag} country={country.name} /> */}
                    <div className="content">
                      <div className="header">{product.name}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="btn-col">
                  <span>
                    <button
                      className="ui teal basic button"
                      onClick={() => dispatch(removeProduct(product))}
                    >
                      Cancel
                    </button>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
