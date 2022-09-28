import axios from "axios";

// action type constant:
const SET_CART_PRODUCTS = "SET_CART_PRODUCTS";
const COUNT_CART_PRODUCTS = "COUNT_CART_PRODUCTS";

// action creator:
export const setCartProducts = (cartProducts) => {
  return {
    type: SET_CART_PRODUCTS,
    cartProducts,
  };
};

export const countCartProducts = (cartProducts) => {
  return {
    type: COUNT_CART_PRODUCTS,
    cartProducts
  }
}

// thunk creator:
export const fetchCartProducts = (userId, apiHeaders) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users/${userId}/cart`, apiHeaders);
      dispatch(setCartProducts(response.data));
    } catch (error) {
      throw error;
    }
  };
};

// started process of counting the total cart products to view with the link for the cart
export const getCartProducts = (userId, apiHeaders) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users/${userId}/cart`, apiHeaders);
      dispatch(countCartProducts(response.data));
    } catch (error) {
      throw error
    }
  }
}

// reducer:
export default function cartProductsReducer(cartProducts = [], action) {
  switch (action.type) {
    case SET_CART_PRODUCTS:
      return action.cartProducts;
    case COUNT_CART_PRODUCTS:
      return [...cartProducts, action.cartProducts.id]
    default:
      return cartProducts;
  }
}
