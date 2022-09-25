import React, {Component} from 'react';
import {fetchSingleProduct, setSingleProduct, updateProduct} from '../store/redux/singleProduct';
import {connect} from 'react-redux';

class EditProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            imageUrl: '',
            price: 0,
            description: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        const {id} = this.props.match.params
        this.props.fetchSingleProduct(id)
    }

    componentWillUnmount(){
        this.props.clearProduct()
    }

    componentDidUpdate(prevProps){
        if(prevProps.product.id !== this.props.product.id){
            this.setState({
                name: this.props.product.name || '',
                imageUrl: this.props.product.address || '',
                price: this.props.product.price || 0,
                description: this.props.product.description || ''
            })
        }
    }

    handleChange(evt){
        this.setState({
        [evt.target.name]: evt.target.value
        })
    }

    handleSubmit(evt){
        evt.preventDefault()
        this.props.updateProduct({...this.props.product, ...this.state})
    }

    render(){
        const {name, imageUrl, price, description} = this.state;
        const {handleSubmit, handleChange} = this;

        return (
            <div>
                <h3>Edit Product</h3>
                <form className='product-form' onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name:</label>
                    <input name='name' onChange={handleChange} value={name} />

                    <label htmlFor='imageUrl'>Image URL:</label>
                    <input name='imageUrl' onChange={handleChange} value={imageUrl} />

                    <label htmlFor='price'>Price:</label>
                    <input name='price' onChange={handleChange} value={price} />

                    <label htmlFor='description'>Description:</label>
                    <input name='description' onChange={handleChange} value={description} />
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({product}) => ({
    product
})

const mapDispatchToProps = (dispatch, {history}) => ({
    updateProduct: (product) => dispatch(updateProduct(product, history)),
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id, history)),
    clearProduct: () => dispatch(setSingleProduct({}))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
