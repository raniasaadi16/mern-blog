import { GET_ALLUSERS,GET_USER, DELETE_USER, CLEAR_MSG } from "../actions/types";

const initialState = {
    users: [],
    user:null,
    msg: null
};

const UserReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GET_ALLUSERS:
            return {
                users: action.payload.data.users,
                msg: null
            } 
        case GET_USER:
            return {
                ...state,
                user: action.payload.data.user,
            }   
        case DELETE_USER:
            return {
                users: state.users.filter(user => user._id !== action.payload.data.user._id),
                msg: action.payload.message
            } 
        case CLEAR_MSG:
            return{
                ...state,
                msg: null
            }
        default:
            return state;
    }
}

export default UserReducer;