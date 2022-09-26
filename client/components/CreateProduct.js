import React, { Component } from "react";
import { createProduct, fetchProducts } from "../store/products";
import { connect } from "react-redux";

const apiHeaders = {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
};

class CreateProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      imageUrl: "",
      price: 0,
      description: "",
      category: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createProduct({ ...this.state }, apiHeaders);
  }

  render() {
    const { name, imageUrl, price, description, category } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form className="product-form" onSubmit={handleSubmit}>
          <h3>Create Product</h3>
          <div>
            <label htmlFor="name">Name:</label>
            <input name="name" onChange={handleChange} value={name} />

            <label htmlFor="imageUrl">Image URL:</label>
            <input name="imageUrl" onChange={handleChange} value={imageUrl} />

            <label htmlFor="price">Price:</label>
            <input name="price" onChange={handleChange} value={price} />

            <label htmlFor="description">Description:</label>
            <input
              name="description"
              onChange={handleChange}
              value={description}
            />
            <label htmlFor="category">Category:</label>
            <input name="category" onChange={handleChange} value={category} />

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch /*{history}*/) => ({
  createProduct: (product, apiHeaders) =>
    dispatch(createProduct(product, /* history,*/ apiHeaders)),
  fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(null, mapDispatchToProps)(CreateProduct);
