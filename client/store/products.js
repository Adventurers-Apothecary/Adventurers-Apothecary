import axios from 'axios'
import history from '../history'

const SET_PRODUCTS = "SET_PRODUCTS";


const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
});


export const fetchProducts = () => async (dispatch) => {
    const {data} = await axios.get('/api/products')
    dispatch(setProducts(data))
};


export default function productsReducer(products = [], action) {
    switch (action.type){
        case SET_PRODUCTS:
            return action.products
        default:
            return products
    }
}