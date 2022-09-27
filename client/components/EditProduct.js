import React, { Component } from "react";
import {
  fetchSingleProduct,
  setSingleProduct,
  updateProduct,
} from "../store/redux/singleProduct";
import { connect, useDispatch } from "react-redux";
import "./css/edit-product.css";

let apiHeaders = {};

class EditProduct extends Component {
  constructor(props) {
    super(props);
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

  componentDidMount() {
    const id = this.props.productId;
    this.props.fetchSingleProduct(id);
    apiHeaders = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
  }

  componentWillUnmount() {
    this.props.clearProduct();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.setState({
        name: this.props.product.name || "",
        imageUrl: this.props.product.imageUrl || "",
        price: this.props.product.price || 0,
        description: this.props.product.description || "",
        category: this.props.product.category || "",
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    apiHeaders = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    evt.preventDefault();
    this.props.updateProduct(
      { ...this.props.product, ...this.state },
      apiHeaders
    );
  }

  render() {
    const { name, imageUrl, price, description, category } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div>
        <h3>ADMINS: Edit Product</h3>
        <div className="edit-product-form-container">
          <form className="edit-product-form" onSubmit={handleSubmit}>
            <span>
              <label htmlFor="name">Name:</label>
              <input name="name" onChange={handleChange} value={name} />

              <label htmlFor="imageUrl">Image URL:</label>
              <input name="imageUrl" onChange={handleChange} value={imageUrl} />
              <label htmlFor="price">Price:</label>
              <input name="price" onChange={handleChange} value={price} />
            </span>
            <span>
              <label htmlFor="description">Description:</label>
              <input
                name="description"
                onChange={handleChange}
                value={description}
              />

              <label htmlFor="category">Category:</label>
              <input name="category" onChange={handleChange} value={category} />
            </span>
            <br />
            <span>
              <button>Submit</button>
            </span>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ product, auth, user }) => ({
  product,
  auth,
  user,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  updateProduct: (product) => dispatch(updateProduct(product, apiHeaders)),
  fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id, history)),
  clearProduct: () => dispatch(setSingleProduct({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
