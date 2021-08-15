import { IS_LOADED, GET_ALLPOSTS, GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, GET_SLIDEPOSTS, CLEAR_MSG } from "../actions/types";
const initialState = {
    posts: [],
    post: null,
    slidPosts : [],
    isLoaded: true,
    msg: null
};

const PostReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADED:
            return {
                ...state,
                isLoaded: true
            }
        case GET_ALLPOSTS:
            return {
                ...state,
                isLoaded: false,
                posts: action.payload.data.posts
            }
        case GET_SLIDEPOSTS:
            return {
                ...state,
                isLoaded: false,
                slidPosts: action.payload.data.posts
            }
        case GET_POST:
        case LIKE_POST:
            return {
                ...state,
                post: action.payload.data.post
            }
        case UPDATE_POST:
            return {
                ...state,
                isLoaded: false,
                post: action.payload.data.post,
                msg: action.payload.message
            }
        case CREATE_POST:
            return {
                ...state,
                isLoaded:false,
                posts: [...state.posts, action.payload.data.post],
                msg: action.payload.message
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload.data.post._id),
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

export default PostReducer