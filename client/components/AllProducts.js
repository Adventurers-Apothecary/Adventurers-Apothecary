import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import "./css/all-products.css";

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <main className="product-container">
        <h2>Products</h2>
        <div className="products">
          {this.props.products.map((product) => (
            <div className="product" key={product.id}>
              <h3>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </h3>
              <img className="product-img" src={product.imageUrl} />
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }
}

const mapState = ({ products }) => {
  return {
    products,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
