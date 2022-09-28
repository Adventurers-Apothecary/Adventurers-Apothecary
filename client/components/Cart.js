import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCart,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  setCart,
  updateProduct,
} from "../store/cart";
import { me } from "../store/auth";
import "./css/cart.css";

let apiHeaders = {};

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    // this.handleUpdate = this.handleUpdate.bind(this);
  }

  async componentDidMount() {
    apiHeaders = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    await this.props.me();
    await this.props.fetchCart(this.props.auth.id, apiHeaders);
  }

  componentWillUnmount() {
    this.props.clearCart();
  }

  render() {
    return (
      <div className="cart-container">
        <h2>Great things are waiting for you!</h2>
        <div className="cart-products">
          {this.props.cart[0] &&
            this.props.cart.map((cart) => (
              <div className="cart-product" key={cart.id}>
                <p className="cart-product-name" style={{ fontWeight: "bold" }}>
                  {cart.name}
                </p>
                <div className="cart-below-name">
                  <img
                    id="cart-product-image"
                    src={cart.imageUrl}
                    alt="product-image"
                    className="cart-product-img"
                  />
                  <div className="cart-quantity-container">
                    <form onSubmit={(evt) => evt.preventDefault()}>
                      {/* // onClick={this.props.increaseQuantity(this.props.match.params.productId)} */}
                      <button
                        className="update-quantity"
                        onClick={async () => {
                          if (cart.cart_products.quantity > 1) {
                            let updatedQuant = cart.cart_products.quantity - 1;
                            await this.props.updateItem(
                              this.props.auth.id,
                              cart.id,
                              { quantity: updatedQuant },
                              apiHeaders
                            );
                            await this.props.fetchCart(
                              this.props.auth.id,
                              apiHeaders
                            );
                          }
                        }}
                      >
                        -
                      </button>
                    </form>

                    <p>Quantity: {cart.cart_products.quantity}</p>

                    <form onSubmit={(evt) => evt.preventDefault()}>
                      {/* // onClick={this.props.increaseQuantity(this.props.match.params.productId)} */}
                      <button
                        className="update-quantity"
                        onClick={async () => {
                          let updatedQuant = cart.cart_products.quantity + 1;
                          await this.props.updateItem(
                            this.props.auth.id,
                            cart.id,
                            { quantity: updatedQuant },
                            apiHeaders
                          );
                          await this.props.fetchCart(
                            this.props.auth.id,
                            apiHeaders
                          );
                        }}
                      >
                        +
                      </button>
                    </form>
                  </div>

                  {/* <br /> */}

                  <form onSubmit={(evt) => evt.preventDefault()}>
                    <button
                      className="delete-product"
                      onClick={async () => {
                        await this.props.deleteItem(
                          this.props.auth.id,
                          cart.id,
                          apiHeaders
                        );
                        await this.props.fetchCart(this.props.auth.id);
                      }}
                    >
                      Remove
                    </button>
                  </form>

                  <p className="total">
                    Total:{" "}
                    {cart.cart_products.quantity * cart.cart_products.price}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <Link
          to="/checkout"
          className="checkout"
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          Proceed To Checkout
        </Link>
        {/* will need an onClick for this button to get to the checkout page */}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchCart: (userId) => dispatch(fetchCart(userId, apiHeaders)),
    clearCart: () => dispatch(setCart({})),
    updateQuantity: (userId, productId) =>
      dispatch(updateQuantity(userId, productId, apiHeaders)),
    me: () => dispatch(me()),
    deleteItem: (userId, productId, apiHeaders) =>
      dispatch(deleteItem(userId, productId, apiHeaders)),
    updateItem: (userId, productId, product, apiHeaders) =>
      dispatch(updateProduct(userId, productId, product, apiHeaders)),
  };
};

export default connect(mapState, mapDispatch)(Cart);

// // onClick={this.props.increaseQuantity(this.props.match.params.productId)}
