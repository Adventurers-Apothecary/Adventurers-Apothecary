import React, { useEffect, useCallback, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./css/single-product.css";

import {
  fetchSingleProduct,
  setSingleProduct,
} from "../store/redux/singleProduct";

import axios from "axios";

function SingleProduct(props) {
  const { id } = useParams();
  const product = props.singleProduct;
  const [quantityCount, setQuantity] = useState(1);

  useEffect(() => {
    props.getSingleProduct(id);
    return () => {
      props.clearSingleProduct();
    };
  }, []);

  // post request test:
  const handleAdd = useCallback(async (evt) => {
    evt.preventDefault();
    await axios.post("/api/users/:userId/cart", {
      quantity: quantityCount,
      productId: id,
    });
  }, []);

  const handleQuantityChange = useCallback(
    async (evt) => {
      await setQuantity(evt.target.value), console.log(quantityCount);
    },
    [quantityCount]
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
          <h3>Price: ${product.price}</h3>
          <img
            src={product.imageUrl}
            alt="image"
            className="single-product-img"
          />
          <p>{product.description}</p>

          <form onSubmit={handleAdd}>
            <span>
              <button onClick={increaseQuantity}>+</button>
              <label htmlFor="quantityCount">Quantity: {quantityCount}</label>
              <button onClick={decreaseQuantity}>-</button>
            </span>
            <p>
              <button type="submit">Add To Cart</button>
            </p>
          </form>
          <p>
            See more in this product's category: <span>{product.category}</span>
          </p>
        </div>
      )}
    </div>
  );
}

const mapState = (state) => {
  return {
    singleProduct: state.product,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
    clearSingleProduct: () => dispatch(setSingleProduct({})),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
