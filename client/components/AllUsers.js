import React from "react";
import {connect} from "react-redux";
import {fetchUsers, deleteUser} from "../store/users";
import {Link} from "react-router-dom";

export class AllUsers extends React.Component {
    
    componentDidMount() {
        this.props.fetchUsers();
    }

    render(){
        return (
            <main>
                <div className="users">
                    <h2>Users</h2>
                    {this.props.users.map(user => (
                        <div className="user" key={user.id} >
                            <h2>
                                <Link to={`/users/${user.id}`}>{user.username}</Link>
                            </h2>
                        <form onSubmit={(ev) => ev.preventDefault()}>
                            <button
                            className="remove"
                            type="submit"
                            onClick={() => this.props.deleteUser(user.id)}
                            >
                                Delete
                            </button>
                        </form>
                        </div>
                    ))}
                </div>
            </main>
        )
    }
}

const mapState = ({users}) => {
    return {
        users
    };
};

const mapDispatch = (dispatch, {history}) => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        deleteUser: (user) => dispatch(deleteUser(user, history))
    };
};

export default connect(mapState, mapDispatch)(AllUsers);
