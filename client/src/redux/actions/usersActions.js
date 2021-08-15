import { GET_ALLUSERS, GET_USER, DELETE_USER, CLEAR_MSG } from "./types";
import axios from 'axios';
import { returnErrors } from "./errorsAction";

export const getAllUsers = () => async dispatch => {
    await axios.get('/users').then(res=> dispatch({
        type: GET_ALLUSERS,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
};

export const getUser = (id) => async dispatch => {
    await axios.get(`/users/${id}`).then(res=> dispatch({
        type: GET_USER,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
};

export const deleteUser = (id) => async dispatch => {
    await axios.delete(`/users/${id}`).then(res=> dispatch({
        type: DELETE_USER,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
};

export const clearMsg = () => {
    return {
        type: CLEAR_MSG
    }
}