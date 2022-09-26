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

// the idea I had is that this would be that I was thinking in my head
// of would be adding a product to the product state array

// or should this something to do with the single productid?
// export const addtoCart = (product, history) => async (dispatch) => {
//     const {data} = await axios.post('/api/products/', product)
//     dispatch(addToCart(data));
//     history.push('/products');
// };

export default function productsReducer(products = [], action) {
    switch (action.type){
        case SET_PRODUCTS:
            return action.products
        // case ADD_TO_CART:
        //     return [...products, action.product]
        default:
            return products
    }
}