import { IS_LOADED, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, ACTIVATE_ACCOUNT, ACTIVATE_FAIL, RESEND_ACTIVATE, CLEAR_MSG, ADD_PROFILE, FORGET_PASS, RESET_PASS, RESET_PASSGET, UPDATE_PASS, UPDATE_EMAIL, UPDATE_ME, CONFIRM_NEWEMAIL, DELETE_ME } from "../actions/types";

const initialState = {
    isAuth: false,
    isLoaded: false,
    user: null,
    msg: null
};

const AuthReducer = (state = initialState, action)=>{
    switch (action.type) {
        case IS_LOADED:
            return {
                ...state,
                isLoaded: true
            }
        case USER_LOADED:
            return {
                ...state,
                isLoaded: false,
                isAuth: action.payload.data.isAuth,
                user: action.payload.data.user
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoaded: true,
                isAuth: true,
                user: action.payload.data.user
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuth: false,
                user: action.payload.data.newUser,
                msg: action.payload.message
            }
        case RESEND_ACTIVATE:
        case FORGET_PASS:
            return {
                ...state,
                isAuth: false,
                user: action.payload.data.user,
                msg: action.payload.message
            }
        case RESET_PASSGET:
            return {
                ...state,
                user: action.payload.data.user
            }
        case RESET_PASS:
        case UPDATE_PASS:
        case UPDATE_ME:
        case CONFIRM_NEWEMAIL:
            return {
                ...state,
                isAuth: true,
                user: action.payload.data.user,
                msg: action.payload.message
            }
        case ACTIVATE_ACCOUNT:
        case UPDATE_EMAIL:
            return {
                ...state,
                msg: action.payload.message
            }
        case ADD_PROFILE:
            return{
                ...state,
                isLoaded: true,
                user: action.payload.data.profilData,
                msg: action.payload.message
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case DELETE_ME:
            return{
                ...state,
                isAuth: false,
                user: null,
                msg: null
            }
        case ACTIVATE_FAIL:
            return{
                ...state,
                msg: null
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

export default AuthReducer;