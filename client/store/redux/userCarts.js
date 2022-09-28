import axios from "axios";

// action type constant:
const SET_USER_CARTS = "SET_USER_CARTS";

// action creator:
export const setUserCarts = (userCarts) => {
  return {
    type: SET_USER_CARTS,
    userCarts,
  };
};

// thunk creator:
export const fetchUserCarts = (userId, apiHeaders) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/carts/${userId}`, apiHeaders);
      dispatch(setUserCarts(response.data));
    } catch (error) {
      throw error;
    }
  };
};

// reducer:
export default function userCartsReducer(userCarts = [], action) {
  switch (action.type) {
    case SET_USER_CARTS:
      return action.userCarts;
    default:
      return userCarts;
  }
}
