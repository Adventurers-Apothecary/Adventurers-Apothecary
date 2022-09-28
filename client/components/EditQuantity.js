import React, { useEffect, useCallback, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./css/single-product.css";
import "./css/cart.css";

import {
  fetchSingleProduct,
  setSingleProduct,
} from "../store/redux/singleProduct";

import { fetchCartProducts } from "../store/redux/cartProducts";

import { fetchCartProduct } from "../store/redux/singleCartProduct";

import axios from "axios";

function EditQuantity(props) {
  const { id } = useParams();
  const userId = props.auth.id;
  const [quantityCount, setQuantity] = useState(1);
  let apiHeaders = {};

  useEffect(() => {
    // apiHeaders = {
    //   headers: {
    //     Authorization: localStorage.getItem("token"),
    //   },
    // };
    setQuantity(props.quant);
    return () => {};
  }, [props.quant]);

  // put request test, should be integrated into redux files:
  const handleUpdate = useCallback(
    async (evt) => {
      apiHeaders = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      evt.preventDefault();
      await axios.put(
        `/api/users/${userId}/cart/${id}`,
        { quantity: quantityCount },
        apiHeaders
      );
      await props.getCartProducts(userId, apiHeaders);
      await props.getCartProduct(userId, id, apiHeaders);
    },
    [props.auth, quantityCount]
  );

  const handleDelete = useCallback(
    async (evt) => {
      apiHeaders = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      evt.preventDefault();
      await axios.delete(`/api/users/${userId}/cart/${id}`, apiHeaders);
      await props.getCartProducts(userId, apiHeaders);
      await props.getCartProduct(userId, id, apiHeaders);
    },
    [props.auth]
  );

  const increaseQuantity = useCallback(
    async (evt) => {
      evt.preventDefault();
      await setQuantity(quantityCount + 1);
    },
    [quantityCount]
  );

  const decreaseQuantity = useCallback(
    async (evt) => {
      evt.preventDefault();
      if (quantityCount > 1) {
        await setQuantity(quantityCount - 1);
      }
    },
    [quantityCount]
  );

  return (
    <div className="edit-quant">
      <p style={{ fontWeight: "bold" }}>
        You currently have{" "}
        {props.singleCartProduct.quantity
          ? props.singleCartProduct.quantity
          : null}{" "}
        in your cart.
      </p>
      <div className="edit-quant-buttons">
        <button onClick={decreaseQuantity} className="circle-button">
          -
        </button>
        <label htmlFor="quantityCount">Quantity: {quantityCount}</label>
        <button onClick={increaseQuantity} className="circle-button">
          +
        </button>

        <form onSubmit={handleUpdate}>
          <p className="edit-quant-submit-buttons">
            <button
              type="submit"
              style={{ marginRight: "10px" }}
              className="edit-quant-button"
            >
              Edit Quantity
            </button>
            <button onClick={handleDelete}>Remove From Cart</button>
          </p>
        </form>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    auth: state.auth,
    cartProducts: state.cartProducts,
    singleCartProduct: state.singleCartProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
    clearSingleProduct: () => dispatch(setSingleProduct({})),
    getCartProducts: (userId, apiHeaders) =>
      dispatch(fetchCartProducts(userId, apiHeaders)),
    getCartProduct: (userId, productId, apiHeaders) =>
      dispatch(fetchCartProduct(userId, productId, apiHeaders)),
  };
};

export default connect(mapState, mapDispatch)(EditQuantity);
