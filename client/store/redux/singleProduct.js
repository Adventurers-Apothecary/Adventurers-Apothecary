import axios from "axios";

// action type constant:
const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";


// action creator:
export const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};

<<<<<<< HEAD
const _updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product
})
=======
>>>>>>> main

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

export const updateProduct = (product) => {
  return async (dispatch) => {
    const {data: updated} = await axios.put(`/api/products/${product.id}`, product)
    dispatch(_updateProduct(updated))
  }
}

// reducer:
export default function singleProductReducer(product = {}, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product;
    case UPDATE_PRODUCT:
      return action.product;
    default:
      return product;
  }
}
