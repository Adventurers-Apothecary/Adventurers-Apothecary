import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';
import { fetchUser } from '../store/user';
import EditUser from './EditUser';

class User extends Component{
    componentDidMount(){
        try {
            this.props.fetchUser(this.props.match.params.id)
        }catch(error){
            console.error(error)
        }
    }

    render(){
        const username = this.props.user.username
        const password = this.props.user.password
        const isAdmin = this.props.user.isAdmin
        
        return(
            <div className='user'>
                <EditUser match={this.props.match} />
                <h1>{username}</h1>
                <p>{password}</p>
                <p>{isAdmin}</p>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => ({
    user
});

const mapDispatchToProps = (dispatch) => ({
    fetchUser: (id) => dispatch(fetchUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
