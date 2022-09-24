import axios from 'axios';

const SET_USER = "SET_USER"
const UPDATE_USER = "UPDATE_USER"

export const setUser = (user) => ({
    type: SET_USER,
    user
})

const _updateUser = (user) => {
    return {
        type: UPDATE_USER,
        user
    }
}

export const fetchUser = (id) => async (dispatch) => {
    const {data} = await axios.get( `/api/users/${id}`);
    dispatch(setUser(data));
};

export const updateUser = (user) => {
    return async (dispatch) => {
        const {data: updated} = await axios.put(`/api/users/${user.id}`, user);
        dispatch(_updateUser(updated));
    };
};

export default function userReducer(user = {}, action) {
    switch (action.type){
        case SET_USER:
            return action.user;
        case UPDATE_USER:
            return action.user;
        default: return user;
    }
}
