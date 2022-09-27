import React, { useEffect, useCallback, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./css/single-product.css";

import {
  fetchSingleProduct,
  setSingleProduct,
} from "../store/redux/singleProduct";
import EditProduct from "./EditProduct";

import { fetchCartProducts } from "../store/redux/cartProducts";

import { fetchCartProduct } from "../store/redux/singleCartProduct";

import EditQuantity from "./EditQuantity";

import axios from "axios";

function SingleProduct(props) {
  const { id } = useParams();
  const product = props.singleProduct;
  const [quantityCount, setQuantity] = useState(1);
  const userId = props.auth.id;

  const apiHeaders = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    props.getSingleProduct(id);
    if (props.auth.id) {
      props.getCartProducts(userId, apiHeaders);
      props.getCartProduct(userId, id, apiHeaders);
    }
    return () => {
      props.clearSingleProduct();
    };
  }, [props.auth, userId]);

  // post request test, should be integrated into redux files:
  const handleAdd = useCallback(
    async (evt) => {
      evt.preventDefault();
      const productPrice = props.singleProduct.price;
      await axios.post(
        `/api/users/${userId}/cart`,
        {
          quantity: quantityCount,
          price: productPrice,
          productId: id,
        },
        apiHeaders
      );
      await props.getCartProducts(userId, apiHeaders);
      await props.getCartProduct(userId, id, apiHeaders);
    },
    [props.auth, quantityCount]
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
    <div className="single-product-container">
      {product && (
        <div className="product-view">
          <h2>{product.name}</h2>
          <h3>Price: ${(Math.round(product.price) / 100).toFixed(2)}</h3>
          <img
            src={product.imageUrl}
            alt="image"
            className="single-product-img"
          />
          <p>{product.description}</p>
          {!props.isLoggedIn && <p>For now: please log in to shop.</p>}
          {props.cartProducts &&
          props.isLoggedIn &&
          props.cartProducts.map((elem) => elem.id).includes(+id) ? (
            <div>
              <EditQuantity quant={props.singleCartProduct.quantity} />
            </div>
          ) : (
            props.isLoggedIn && (
              <form onSubmit={handleAdd}>
                <span>
                  <button onClick={increaseQuantity}>+</button>
                  <label htmlFor="quantityCount">
                    Quantity: {quantityCount}
                  </label>
                  <button onClick={decreaseQuantity}>-</button>
                </span>
                <p>
                  <button type="submit">Add To Cart</button>
                </p>
              </form>
            )
          )}
          <p>
            See more in this product's category: <span>{product.category}</span>
          </p>
          <EditProduct productId={props.match.params.id} />
        </div>
      )}
    </div>
  );
}

const mapState = (state) => {
  return {
    singleProduct: state.product,
    auth: state.auth,
    cartProducts: state.cartProducts,
    singleCartProduct: state.singleCartProduct,
    isLoggedIn: !!state.auth.id,
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

export default connect(mapState, mapDispatch)(SingleProduct);
