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
import axios from "axios";

let apiHeaders = {};
let checkoutPrice = 0;

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchased: false,
    };
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
        {this.state.purchased ? (
          <h2>You just purchased:</h2>
        ) : (
          <h2>You will purchase:</h2>
        )}
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
                  <div className="cart-quantity-container"></div>
                  {/* <br /> */}
                  {/* <form onSubmit={(evt) => evt.preventDefault()}>
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
                  </form> */}
                  <p className="total" style={{ fontWeight: "bold" }}>
                    Total: {/* <span style={{fontWeight: "bold"}> */}
                    {Math.round(
                      (cart.cart_products.quantity * cart.price) / 100
                    ).toFixed(2)}
                    {/* </span> */}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {this.props.cart[0] ? (
          <h2>
            TOTAL: $
            {Math.round(
              this.props.cart.reduce(
                (acc, cart) =>
                  acc + cart.cart_products.quantity * Number(cart.price),
                0
              ) / 100
            ).toFixed(2)}
          </h2>
        ) : null}
        <form onSubmit={(evt) => evt.preventDefault()}>
          {this.state.purchased ? null : (
            <button
              onClick={async () => {
                (checkoutPrice = this.props.cart.reduce(
                  (acc, cart) =>
                    acc + cart.cart_products.quantity * Number(cart.price),
                  0
                )),
                  (apiHeaders = {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  });
                await axios.put(
                  `/api/carts/${this.props.auth.id}`,
                  {
                    isComplete: true,
                    totalPrice: checkoutPrice,
                  },
                  apiHeaders
                );
                await this.setState((state) => ({
                  purchased: true,
                }));
              }}
            >
              COMPLETE PURCHASE
            </button>
          )}
        </form>
        {this.state.purchased ? (
          <p>
            {" "}
            <Link
              to="/products"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              Keep Shopping!
            </Link>
          </p>
        ) : (
          <p>
            <Link
              to="/cart"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              Back To Cart
            </Link>
          </p>
        )}
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
