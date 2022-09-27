import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import productsReducer from "./products";
import singleProductReducer from "./redux/singleProduct";
// import userReducer from "./user";
// import usersReducer from "./users";
import cartReducer from "./cart";
import cartProductsReducer from "./redux/cartProducts";
import singleCartProductReducer from "./redux/singleCartProduct";

const reducer = combineReducers({
  auth,
  // users: usersReducer,
  // user: userReducer,
  products: productsReducer,
  product: singleProductReducer,
  cart: cartReducer,
  cartProducts: cartProductsReducer,
  singleCartProduct: singleCartProductReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
