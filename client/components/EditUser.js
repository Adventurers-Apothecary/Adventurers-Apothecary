import React, {Component} from 'react';
import {fetchUser, setUser, updateUser} from '../store/user';
import {connect} from 'react-redux';

class EditUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            isAdmin: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        const {id} = this.props.match.params
        this.props.fetchUser(id)
    }

    componentWillUnmount(){
        this.props.clearUser()
    }

    componentDidUpdate(prevProps){
        if(prevProps.user.id !== this.props.user.id){
            this.setState({
                username: this.props.user.name || '',
                password: this.props.user.password || '',
                isAdmin: this.props.user.isAdmin || false
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
        this.props.updateUser({...this.props.user, ...this.state})
    }

    render(){
        const {username, password, isAdmin} = this.state;
        const {handleSubmit, handleChange} = this
        
        return(
            <div>
                <form className='user-form' onSubmit={handleSubmit}>
                    <h3>Edit User</h3>
                    <label htmlFor='username'>Username:</label>
                    <input name='username' onChange={handleChange} value={username} />

                    <label htmlFor='password'>Password:</label>
                    <input name='password' onChange={handleChange} value={password} />

                    <label htmlFor='isAdmin'>Is Admin?</label>
                    <input name='isAdmin' onChange={handleChange} value={isAdmin} />

                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => ({
    user
})

const mapDispatchToProps = (dispatch, {history}) => ({
    updateUser: (user) => dispatch(updateUser(user, history)),
    fetchUser: (id) => dispatch(fetchUser(id, history)),
    clearUser: () => dispatch(setUser({}))
}
)

export default connect(mapStateToProps, mapDispatchToProps)(EditUser)
