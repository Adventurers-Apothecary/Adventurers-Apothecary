import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import "./css/all-products.css";
import CreateProduct from "./CreateProduct";

const apiHeaders = {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
};

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <main className="product-container">
        <h2>All Products</h2>
        {this.props.isAdmin ? <CreateProduct /> : null}
        <div className="products">
          {this.props.products.map((product) => (
            <div className="product" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img className="product-img" src={product.imageUrl} />
              </Link>
              <div className="product-info">
                <h3>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <p>${(Math.round(product.price) / 100).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
