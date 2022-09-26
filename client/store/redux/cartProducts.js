import axios from "axios";

// action type constant:
const SET_CART_PRODUCTS = "SET_CART_PRODUCTS";

// action creator:
export const setCartProducts = (cartProducts) => {
  return {
    type: SET_CART_PRODUCTS,
    cartProducts,
  };
};

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

// reducer:
export default function cartProductsReducer(cartProducts = [], action) {
  switch (action.type) {
    case SET_CART_PRODUCTS:
      return action.cartProducts;
    default:
      return cartProducts;
  }
}
