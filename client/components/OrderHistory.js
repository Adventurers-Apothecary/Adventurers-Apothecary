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
import { fetchUserCarts, setUserCarts } from "../store/redux/userCarts";
import { me } from "../store/auth";
import "./css/cart.css";

let apiHeaders = {};

export class OrderHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    apiHeaders = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    await this.props.me();
    await this.props.fetchUserCarts(this.props.auth.id, apiHeaders);
  }

  componentWillUnmount() {
    this.props.clearUserCarts();
  }

  render() {
    return (
      <div className="cart-container">
        <h2>Your Order History:</h2>
        <div>
          <table
            style={{
              border: "2px solid",
              width: "200px",
              borderCollapse: "collapse",
            }}
          >
            {this.props.userCarts[0] &&
              this.props.userCarts.map((cart) => (
                <tbody key={cart.id}>
                  <tr>
                    <td
                      style={{
                        border: "2px solid",
                        width: "200px",
                        borderCollapse: "collapse",
                      }}
                    >
                      Id: {cart.id}
                    </td>
                    <td
                      style={{
                        border: "2px solid",
                        width: "200px",
                        borderCollapse: "collapse",
                      }}
                    >
                      Price: {Math.round(cart.totalPrice / 100).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    userCarts: state.userCarts,
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchUserCarts: (userId) => dispatch(fetchUserCarts(userId, apiHeaders)),
    clearUserCarts: () => dispatch(setUserCarts({})),
    me: () => dispatch(me()),
  };
};

export default connect(mapState, mapDispatch)(OrderHistory);

// // onClick={this.props.increaseQuantity(this.props.match.params.productId)}
