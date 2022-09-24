import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
    render() {
        return(
            <div className="cart-container">
                <h2>Great things are waiting for you!</h2>
                <ul className="cart">
                    {this.props.products.map((product) => (
                        <li className="cart-products" key={product.id}>
                            <p>{product.name}</p>
                            <p className="amount">
                                {product.quantity * product.price}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}


// treating the cart as it's own array 
// (in it's redux store)?  Maybe need to map?

// within this component: 
// going to need the quantity of products(productId?) 
// and total price

// will need an onClick event when user 
// clicks on "View Cart" (that is on the nav bar)

// also need to figure out how to show the current number 
// of items in cart 
// kind of like View Cart (2) or figure out a cart symbol

// what are we mapping for the state and then what would be dispatch?

export default connect(mapState, null)(Cart)