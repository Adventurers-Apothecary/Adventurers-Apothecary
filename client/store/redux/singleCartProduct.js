import axios from "axios";

// action type constant:
const SET_SINGLE_CART_PRODUCT = "SET_SINGLE_CART_PRODUCT";

// action creator:
export const setCartProduct = (singleCartProduct) => {
  return {
    type: SET_SINGLE_CART_PRODUCT,
    singleCartProduct,
  };
};

// thunk creator:
export const fetchCartProduct = (userId, productId, apiHeaders) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/api/users/${userId}/cart/${productId}`,
        apiHeaders
      );
      dispatch(setCartProduct(response.data));
    } catch (error) {
      throw error;
    }
  };
};

// reducer:
export default function singleCartProductReducer(
  singleCartProduct = {},
  action
) {
  switch (action.type) {
    case SET_SINGLE_CART_PRODUCT:
      return action.singleCartProduct;
    default:
      return singleCartProduct;
  }
}
