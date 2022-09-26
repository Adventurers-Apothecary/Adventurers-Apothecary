import React, { useEffect, useCallback, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./css/single-product.css";

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
  const apiHeaders = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    setQuantity(props.quant);
    return () => {};
  }, [props.quant]);

  const handleUpdate = useCallback(
    async (evt) => {
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
    <div>
      <p>
        You currently have{" "}
        {props.singleCartProduct.quantity
          ? props.singleCartProduct.quantity
          : null}{" "}
        in your cart.
      </p>
      <form onSubmit={handleUpdate}>
        <span>
          <button onClick={increaseQuantity}>+</button>
          <label htmlFor="quantityCount">Quantity: {quantityCount}</label>
          <button onClick={decreaseQuantity}>-</button>
        </span>
        <p>
          <button type="submit">Edit Quantity</button>
          <button onClick={handleDelete}>Remove From Cart</button>
        </p>
      </form>
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
