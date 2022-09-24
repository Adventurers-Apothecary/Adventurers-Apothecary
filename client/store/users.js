import axios from 'axios';

const SET_USERS = "SET_USERS";
const DELETE_USER = "DELETE_USER";

const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    };
};

const _deleteUser = (user) => {
    return {
        type: DELETE_USER,
        user
    }
}

export const fetchUsers = () => async(dispatch) => {
    const {data} = await axios.get(`api/users`);
    dispatch(setUsers(data));
};

export const deleteUser = (id) => {
    return async (dispatch) => {
        const {data: user} = await axios.delete(`api/students${id}`);
        dispatch(_deleteUser(user));
    };
};

export default function usersReducer(users = [], action){
    switch (action.type){
        case SET_USERS:
            return action.users;
        case DELETE_USER:
            return users.filter((user) => user.id !== action.user.id);
        default: 
        return users;
    }
}