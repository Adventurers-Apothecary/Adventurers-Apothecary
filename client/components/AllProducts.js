import React from "react"
import {connect} from "react-redux"
import { fetchProducts } from "../store/products"
import { Link } from "react-router-dom"

export class AllProducts extends React.Component {
    componentDidMount(){
        this.props.fetchProducts()
    }

    render(){
        return(
            <main>
                <div className="products">
                    <h2>Products</h2>
                    {this.props.products.map(product => (
                       <div className="product" key={product.id} >
                        <h2>
                            <Link to={`/products/${product.id}`}>{product.name}</Link>
                            </h2>
                            <img src={product.imageUrl} />
                            <p>{product.price}</p>
                            </div>
                    ))}
                </div>
            </main>
        )
    }
}

const mapState = ({products}) => {
    return {
        products
    }
}

const mapDispatch = (dispatch, {history}) => {
    return {
        fetchProducts: () => dispatch(fetchProducts())
    }
}

export default connect(mapState, mapDispatch)(AllProducts)
