import axios from 'axios';
import history from '../history';

const SET_CART = "SET_CART";
const EDIT_ITEM = "EDIT_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const PROCEED_TO_CHECKOUT = "PROCEED_TO_CHECKOUT";

const setCart = () => ({
    type: SET_CART,
});

const editQuantity = (product) => ({
    type: EDIT_ITEM,
    product
    // or should this be productId, or quantity?
});

const deleteProduct = (product) => ({
    type: DELETE_ITEM,
    product,
    // should this be productId or quantity?
})

// my thought process is when they click on View Cart it will fetch that users cart 
// with their specifed products and quantity
export const fetchCart = () => {
    return async (dispatch) => {
        const { data } = await axios.get('/:userId/cart');
        dispatch(setCart(data));
    }
}

export const updateQuantity = (product, history) => {
    return async (dispatch) => {
        const { data } = await axios.put(`/:userId/cart/${product.quantity}`, product);
        dispatch(editQuantity(data));
        history.push('/cart')
        // or should it be looking at it the productId?
        // would this also be POST because technically it's creating a new amount?
    }
}

export const deleteItem = (productId, history) => {
    return async (dispatch) => {
        const { data } = await axios.delete(`/:userId/cart/${productId}`); 
        // or should this be productId?
        dispatch(deleteProduct(data));
        history.push('/cart');
    }
}


export default function cartReducer(carts = [], action) {
    switch(action.type) {
        case SET_CART:
            return action.cart
        case EDIT_ITEM:
            // case for adding/subtracting from quantity (look up an example from redux examples)
        case DELETE_ITEM:
            return cart.filter((product) => product.id !== action.product.id)
            // case for deleting/removing from cart
        case PROCEED_TO_CHECKOUT:
            // case for getting to checkout page
        default:
            return carts
    }
}

// also, I think should be where we want to be able to add the functionality 
// of editing the cart (such as updating quantity or deleting)

