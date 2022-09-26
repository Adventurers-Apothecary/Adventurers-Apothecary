import axios from "axios";

// action type constant:
const SET_CART_PRODUCTS = "SET_CART_PRODUCTS";
// const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";

// action creator:
export const setCartProducts = (cartProducts) => {
  return {
    type: SET_CART_PRODUCTS,
    cartProducts,
  };
};

// export const _addCartProduct = (cartProduct) => {
//   return {
//     type: ADD_PRODUCT_TO_CART,
//     cartProduct,
//   };
// };

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

// export const addProductToCart = (cartProduct) => {
//   return async (dispatch) => {
//     try {
//       const newCartProduct = await axios.post(
//         "/api/users/:userId/cart",
//         cartProduct
//       );
//       dispatch(_addCampus(newCartProduct.data));
//     } catch (error) {
//       throw error;
//     }
//   };
// };

// reducer:
export default function cartProductsReducer(cartProducts = [], action) {
  switch (action.type) {
    case SET_CART_PRODUCTS:
      return action.cartProducts;
    // case ADD_PRODUCT_TO_CART:
    //   return [...cartProducts, action.cartProduct];
    default:
      return cartProducts;
  }
}
