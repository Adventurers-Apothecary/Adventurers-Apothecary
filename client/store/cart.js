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

const editQuantity = (quantity) => ({
    type: UPDATE_QUANTITY,
    productId
    // or should this be productId, or quantity?
});

const deleteProduct = (productId) => ({
    type: DELETE_ITEM,
    productId
    // should this be productId?
})

export const fetchCart = (userId, apiHeaders) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/api/users/${userId}/cart`, apiHeaders);
        dispatch(setCart(data));
    }
}

export const increaseQuantity = (userId, quantity, apiHeaders) => {
    return async (dispatch) => {
        const { data } = await axios.put(`/api/users/${userId}/cart/${productId}/increase`, apiHeaders);
        dispatch(editQuantity(data));
       
    }
}

export const decreaseQuantity = (userId, quantity, apiHeaders) => {
    return async (dispatch) => {
        const { data } = await axios.put(`/api/users/${userId}/cart/${productId}/decrease`, apiHeaders);
        dispatch(editQuantity(data));
    }
}

export const deleteItem = (userId, productId, history, apiHeaders) => {
    return async (dispatch) => {
        const { data } = await axios.delete(`/api/users/${userId}/cart/${productId}`, apiHeaders); 
        dispatch(deleteProduct(data));
        history.push('/cart');
    }
}

export default function cartReducer(cart = [], action) { 
    switch(action.type) {
        case SET_CART:
            return action.cart
        case UPDATE_QUANTITY:
            return cart.map((cart) => cart.id === action.cart.id ? action.cart : cart)
        case DELETE_ITEM:
            return cart.filter((cart) => cart.cart_products.productId !== action.cart.cart_products.productId)
            // return cart.filter((cart) => cart.id !== action.cart.id)
        // case PROCEED_TO_CHECKOUT:
        //     // case for getting to checkout page
        default:
            return cart
    }
}




