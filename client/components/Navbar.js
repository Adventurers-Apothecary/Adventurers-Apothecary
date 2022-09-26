import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Adventurer's Apothecary</h1>
    <h2>Feed your apothecarium side!</h2>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" style={{ color: "inherit", textDecoration: "underline" }}>Home</Link>
          <Link to="/products" style={{ color: "inherit", textDecoration: "underline" }}>View All Products</Link>
          <Link to="/orderhistory" style={{ color: "inherit", textDecoration: "underline" }}>Order History</Link>
          <Link to="/cart" style={{ color: "inherit", textDecoration: "underline" }}>My Cart</Link>
          {/* <Link to="/cart"><i className="material-icons">shopping_cart</i></Link> */}
          <a href="#" onClick={handleClick} style={{ color: "inherit", textDecoration: "underline" }}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home" style={{ color: "inherit", textDecoration: "underline" }}>Home</Link>
          <Link to="/products" style={{ color: "inherit", textDecoration: "underline" }}>View All Products</Link>
          <Link to="/cart" style={{ color: "inherit", textDecoration: "underline" }}>My Cart</Link>
          <Link to="/login" style={{ color: "inherit", textDecoration: "underline" }}>Login</Link>
          <Link to="/signup" style={{ color: "inherit", textDecoration: "underline" }}>Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
