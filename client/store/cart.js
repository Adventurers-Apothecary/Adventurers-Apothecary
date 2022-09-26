import axios from 'axios';
import history from '../history';

const SET_CART = "SET_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const DELETE_ITEM = "DELETE_ITEM";
const PROCEED_TO_CHECKOUT = "PROCEED_TO_CHECKOUT";

const setCart = (cart) => ({
    type: SET_CART,
    cart
});

const editQuantity = (product) => ({
    type: UPDATE_QUANTITY,
    product
    // or should this be productId, or quantity?
});

const deleteProduct = (product) => ({
    type: DELETE_ITEM,
    product,
    // should this be productId or quantity?
})

export const fetchCart = (userId) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/api/users/${userId}/cart`);
        dispatch(setCart(data));
    }
}

export const increaseQuantity = (productId) => {
    return async (dispatch) => {
        const { data } = await axios.put(`/:userId/cart/${productId}/increase`);
        dispatch(editQuantity(data));
        // or should it be looking at it the productId?
        
    }
}

export const decreaseQuantity = (productId) => {
    return async (dispatch) => {
        const { data } = await axios.put(`/:userId/cart/${productId}/decrease`);
        dispatch(editQuantity(data));
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


export default function cartReducer(cart = [], action) {
    switch(action.type) {
        case SET_CART:
            return action.cart
        // case UPDATE_QUANTITY:
            // return {...cart, cart_products: action.quantity}
        // case DELETE_ITEM:
        //     return cart.filter((product) => product.id !== action.product.id)
            // case for deleting/removing from cart
        // case PROCEED_TO_CHECKOUT:
        //     // case for getting to checkout page
        default:
            return cart
    }
}




