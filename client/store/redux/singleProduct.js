import axios from "axios";

// action type constant:
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";


// action creator:
export const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};


// thunk creator:
export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      dispatch(setSingleProduct(response.data));
    } catch (error) {
      throw error;
    }
  };
};

// reducer:
export default function singleProductReducer(product = {}, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product;
    default:
      return product;
  }
}
