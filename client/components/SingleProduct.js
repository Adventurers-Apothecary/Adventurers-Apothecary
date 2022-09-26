import React, { useEffect } from "react";
import { connect} from "react-redux";
import { useParams } from "react-router-dom";
import "./css/single-product.css";

import {
  fetchSingleProduct,
  setSingleProduct,
} from "../store/redux/singleProduct";
import EditProduct from "./EditProduct";

function SingleProduct(props) {
 
  const { id } = useParams();
  const product = props.singleProduct;


  useEffect(() => {
    props.getSingleProduct(id);
    return () => {
      props.clearSingleProduct();
    };
  }, []);

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
          <p>
            See more in this product's category: <span>{product.category}</span>
          </p>
          <EditProduct />
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
