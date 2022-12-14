import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Cart from "./components/Cart";
// don't forget to import Checkout from components
import { me } from "./store";
import AllUsers from "./components/AllUsers";
import User from "./components/User";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/home" component={Home} />
            {/* <Redirect to="/home" /> */}
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            {/* <Route exact path="/users" component={AllUsers} />
            <Route path="/users/:id" component={User} /> */}
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orderhistory" component={OrderHistory} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/cart" component={Cart} />
            {/* <Route path="/checkout" component={Checkout} /> */}
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
