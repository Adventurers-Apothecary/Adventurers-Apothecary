import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart } from '../store/cart';
import { me } from '../store/auth';

export class Cart extends React.Component {
    constructor(props) {
        super(props)

    }

    async componentDidMount() {
        await this.props.me()
        await this.props.fetchCart(this.props.auth.id);
        
    }

    render() {
        return(
            <div className="cart">
                <h2>Great things are waiting for you!</h2>
                <div className="cart-container">
                    {this.props.cart.map((cart) => (
                        <div className="cart-products" key={cart.id}>
                            <p>{cart.name}</p>
                            <img id="cart-product-image" src={cart.imageUrl} alt="product-image"/>
                            <p>Quantity: {cart.cart_products.quantity}</p>
                            <button className="update-quantity">+</button>
                            <button className="update-quantity">-</button>
                            <p className="total">
                                Total: {cart.cart_products.quantity * cart.cart_products.price}
                            </p>
                        </div>
                    ))}
                </div>
                <button className="checkout">Proceed To Checkout</button>
                    {/* will need an onClick for this button to get to the checkout page */}
            </div>
        )
    }
}

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