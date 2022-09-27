import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, deleteItem, increaseQuantity, decreaseQuantity} from '../store/cart';
import { me } from '../store/auth';

const apiHeaders = {
    headers: {
        Authorization: localStorage.getItem("token")
    }
}

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

                            <form onSubmit={(evt) => evt.preventDefault()}>
                            {/* // onClick={this.props.increaseQuantity(this.props.match.params.productId)} */}
                                <button className="update-quantity">
                                    +
                                </button> 
                            </form>

                            <p>Quantity: {cart.cart_products.quantity}</p>

                            <form>
                            {/* // onClick={this.props.increaseQuantity(this.props.match.params.productId)} */}
                                <button className="update-quantity">
                                    -
                                </button>
                            </form>

                            <br/>

                            <form onSubmit={(evt) => evt.preventDefault()}>
                                <button 
                                className="delete-product"
                                onClick={() => this.props.deleteItem(cart.cart_products.productId)}
                                >
                                    Delete from Cart
                                </button>
                            </form>

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

const mapState = (state) => {
    return {
        cart: state.cart,
        auth: state.auth 
    };
};


const mapDispatch = (dispatch, { history }) => {
    return {
        fetchCart: (userId) => dispatch(fetchCart(userId, apiHeaders)),
        updateQuantity: (userId, productId) => dispatch(updateQuantity(userId, productId, apiHeaders)),
        deleteItem: (userId, productId) => dispatch(deleteItem(userId, productId, history, apiHeaders)),
        me: () => dispatch(me()),
    };
};



export default connect(mapState, mapDispatch)(Cart)

// // onClick={this.props.increaseQuantity(this.props.match.params.productId)}