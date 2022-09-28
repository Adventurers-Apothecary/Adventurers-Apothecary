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

  // const apiHeaders = {
  //   headers: {
  //     Authorization: localStorage.getItem("token"),
  //   },
  // };

  let apiHeaders = {};

  useEffect(() => {
    apiHeaders = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
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
      apiHeaders = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      evt.preventDefault();
      // const productPrice = props.singleProduct.price;
      await axios.post(
        `/api/users/${userId}/cart`,
        {
          quantity: quantityCount,
          // price: productPrice,
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
      {props.isAdmin && <EditProduct productId={props.match.params.id} />}
      {product && (
        <div className="product-view">
          <div className="single-product-left">
            <img
              src={product.imageUrl}
              alt="image"
              className="single-product-img"
            />
          </div>
          <div className="single-product-info">
            <div className="info-top">
              <h2>{product.name}</h2>
              <h3>Price: ${(Math.round(product.price) / 100).toFixed(2)}</h3>
              <p>{product.description}</p>
              <p style={{ fontSize: "90%", fontStyle: "italic" }}>
                category: {product.category}
              </p>
            </div>
            <div className="info-bottom">
              {!props.isLoggedIn && <p>For now: please log in to shop.</p>}
              {props.cartProducts &&
              props.isLoggedIn &&
              props.cartProducts.map((elem) => elem.id).includes(+id) ? (
                <div>
                  <EditQuantity quant={props.singleCartProduct.quantity} />
                </div>
              ) : (
                props.isLoggedIn && (
                  <form onSubmit={handleAdd} className="add-to-cart-buttons">
                    <button
                      onClick={decreaseQuantity}
                      className="circle-button"
                    >
                      -
                    </button>

                    <label htmlFor="quantityCount">
                      Quantity: {quantityCount}
                    </label>
                    <button
                      onClick={increaseQuantity}
                      className="circle-button"
                    >
                      +
                    </button>

                    <p className="edit-quant-submit-buttons">
                      <button type="submit" style={{ padding: "5px" }}>
                        Add To Cart
                      </button>
                    </p>
                  </form>
                )
              )}
              {/* <p>
                See more in this product's category:{" "}
                <span>{product.category}</span>
              </p> */}
            </div>
          </div>
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
    isAdmin: !!state.auth.isAdmin,
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
