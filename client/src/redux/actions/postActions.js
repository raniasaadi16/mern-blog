import { IS_LOADED, GET_ALLPOSTS, GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, CLEAR_MSG, GET_SLIDEPOSTS } from "./types";
import axios from 'axios';
import { returnErrors } from "./errorsAction";

export const getAllPosts = (search) => async dispatch => {
    await axios.get(`/posts/${search}`).then(res=> dispatch({
        type: GET_ALLPOSTS,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
    dispatch({type: IS_LOADED});
};

export const getSlidPosts = () => async dispatch => {
    await axios.get('/posts/?sort=likeCount&limit=10').then(res=> dispatch({
        type: GET_SLIDEPOSTS,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
    dispatch({type: IS_LOADED});
};


export const getPost = (id) => async dispatch => {
    //dispatch({type: IS_LOADED});
    await axios.get(`/posts/${id}`).then(res=> dispatch({
        type: GET_POST,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
    dispatch({type: IS_LOADED});
};

export const createPost = (data) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    await axios.post('/posts',data,config).then(res=> dispatch({
        type: CREATE_POST,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
    dispatch({type: IS_LOADED});
};

export const updatePost = (id, data) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    await axios.patch(`/posts/${id}`,data,config).then(res=> dispatch({
        type: UPDATE_POST,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
    dispatch({type: IS_LOADED});
};

export const deletePost = (id) => async dispatch => {
    await axios.delete(`/posts/${id}`).then(res=> dispatch({
        type: DELETE_POST,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
};

export const likePost = (id) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    await axios.patch(`/posts/${id}/likePost`,config).then(res=> dispatch({
        type: LIKE_POST,
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