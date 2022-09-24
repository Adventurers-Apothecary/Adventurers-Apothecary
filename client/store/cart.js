import axios from 'axios';
import history from '../history';

const SET_CART = "SET_CART";

const setCart = () => ({
    type: SET_CART,
});

// my thought process is when they click on View Cart it will fetch that users cart 
// with their specifed products and quantity
export const fetchCart = () => async (dispatch) => {
    const { data } = await axios.get('/api/users/:userId/cart');
    dispatch(setCart(data));
};

export default function cartReducer(cart = [], action) {
    switch(action.type) {
        case SET_CART:
            return action.cart
        default:
            return cart
    }
}

// also, I think should be where we want to be able to add the functionality 
// of editing the cart (such as updating quantity or deleting)

