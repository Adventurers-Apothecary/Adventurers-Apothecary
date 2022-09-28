import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import "./css/navbar.css";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="full-nav">
    <img
      className="brand-image"
      src="https://live.staticflickr.com/65535/52388139047_674b5e1fe8_b.jpg"
      alt="Adventurer's Apothecary logo"
    />
    <nav className="nav-container">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link
            to="/home"
            style={{ /*color: "inherit",*/ textDecoration: "underline" }}
          >
            Home
          </Link>
          <Link
            to="/products"
            style={{ /*color: "inherit",*/ textDecoration: "underline" }}
          >
            View All Products
          </Link>
          <Link
            to="/cart"
            style={{ textDecoration: "underline" }}
            className="badge"
          >
            My Cart
          </Link>
          <a
            href="#"
            onClick={handleClick}
            style={{ textDecoration: "underline" }}
          >
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link
            to="/home"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Home
          </Link>
          <Link
            to="/products"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            View All Products
          </Link>
          <Link
            to="/cart"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            My Cart
          </Link>
          <Link
            to="/login"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
    {/* <hr /> */}
  </div>
);

// REMOVED ORDER HISTORY LINK:
// <Link to="/orderhistory" style={{ /*color: "inherit",*/ textDecoration: "underline" }}>
// Order History
// </Link>

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
