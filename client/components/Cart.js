import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart } from '../store/cart';
import { me } from '../store/auth';

// or map through products to get the products?

export class Cart extends React.Component {
    constructor(props) {
        super(props)

    }

    async componentDidMount() {
        await this.props.me()
        // console.log(this.props);
        await this.props.fetchCart(this.props.auth.id);
        
    }

    render() {
        return(
            <div className="cart-container">
                <h2>Great things are waiting for you!</h2>
                <div className="cart">
                    {this.props.cart.map((cart) => (
                        <div className="cart-products" key={cart.id}>
                            <p>{cart.name}</p>
                            <p>Quantity: {cart.cart_products.quantity}</p>
                            <button className="update-quantity">+</button>
                            <button className="update-quantity">-</button>
                            <p className="total">
                                Total: {cart.cart_products.quantity * cart.cart_products.price}
                            </p>
                        </div>
                    ))}
                    <button className="checkout">Go To Checkout</button>
                    {/* will need an onClick for this button to get to the checkout page */}
                </div>
            </div>
        )
    }
}


// {this.props.cart[0] && this.props.cart[0].cart_products.map((cart) =>
// throught process:
    // mapping through the cart to and 
    // map the cart_products (to get the quantity, cartId)

    // added the checkout button, so will need an onClick for 
    // that to go to the checkout page

    // also need to figure out how to show the current number 
    // of items in cart 
    // kind of like View Cart (2) or figure out a cart symbol

const mapState = (state) => {
    return {
        cart: state.cart,
        auth: state.auth 
    };
};


const mapDispatch = (dispatch, { history }) => {
    return {
        fetchCart: (userId) => dispatch(fetchCart(userId)),
        me: () => dispatch(me()),
    };
};



export default connect(mapState, mapDispatch)(Cart)