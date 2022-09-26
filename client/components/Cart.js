import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart } from '../store/cart';

// or map through products to get the products?
export class Cart extends React.Component {
    componentDidMount() {
        this.props.fetchCart();
    }

    render() {
        return(
            <div className="cart-container">
                <h2>Great things are waiting for you!</h2>
                <ul className="cart">
                    {this.props.cart.map((cart) => (
                        <li className="cart-products" key={cart.id}>
                            <p>{cart.productId.quantity}</p>
                            <button className="update-quantity">+</button>
                            <button className="update-quantity">-</button>
                            <p className="total">
                                Total: {cart.productId.quantity * cart.productId.price}
                            </p>
                        </li>
                    ))}
                    <button className="checkout">Go To Checkout</button>
                    {/* will need an onClick for this button to get to the checkout page */}
                </ul>
            </div>
        )
    }
}

const mapState = ({ cart }) => {
    return {
        cart
    };
};

// may possibly need componentDidMount
const mapDispatch = (dispatch, { history }) => {
    return {
        fetchCart: () => dispatch(fetchCart()),
    };
};


// within this component: 
// going to need the quantity of products(productId?) 
// and total price

// will need an onClick event when user 
// clicks on "View Cart" (that is on the nav bar)

// also need to figure out how to show the current number 
// of items in cart 
// kind of like View Cart (2) or figure out a cart symbol


export default connect(mapState, mapDispatch)(Cart)