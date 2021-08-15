import { IS_LOADED, GET_COMMENTS, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, CLEAR_MSG } from "../actions/types";

const initialState = {
    comments: [],
    isLoaded: true,
    msg: null
};

const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADED:
            return {
                ...state,
                isLoaded: true
            }
        case GET_COMMENTS:
            return {
                ...state,
                isLoaded: false,
                comments: action.payload.data.comments
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                comments: action.payload.data.comment,
                msg: action.payload.message
            }
        case CREATE_COMMENT:
            return {
                ...state,
                comments: [...state.comments,action.payload.data.comment],
                msg: action.payload.message
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id !== action.payload.data.comment._id),
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
};

export default CommentReducer;