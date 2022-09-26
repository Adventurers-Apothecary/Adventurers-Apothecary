import axios from 'axios'


const SET_PRODUCTS = "SET_PRODUCTS"
const CREATE_PRODUCT = "CREATE_PRODUCT"
const DELETE_PRODUCT = "DELETE_PRODUCT"

const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
})

const _createProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
})

const _deleteProduct = (product) => ({
    type: DELETE_PRODUCT,
    product
})

export const fetchProducts = () => async (dispatch) => {
    const {data} = await axios.get('/api/products')
    dispatch(setProducts(data))
}

export const createProduct = (product, history) => {
    return async (dispatch) => {
        const {data: created} = await axios.post('api/products', product)
        dispatch(_createProduct(created));
        history.push('/')
    }
}

export const deleteProduct = (id) => {
    return async(dispatch) => {
        const {data: product} = await axios.delete(`/api/products/${id}`)
        dispatch(_deleteProduct(product))
    }
}

export default function productsReducer(products = [], action) {
    switch (action.type){
        case SET_PRODUCTS:
            return action.products;
        case CREATE_PRODUCT:
            return [...products, action.product];
        case DELETE_PRODUCT:
            return products.filter((product) => product.id !== action.product.id);
        default:
            return products;
    }
}