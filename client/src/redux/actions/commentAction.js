import { IS_LOADED, GET_COMMENTS, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, CLEAR_MSG } from "./types";
import axios from 'axios';
import { returnErrors } from "./errorsAction";

export const getAllComments = (id) => async dispatch => {
    await axios.get(`/posts/${id}/comments`).then(res=> dispatch({
        type: GET_COMMENTS,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
   // dispatch({type: IS_LOADED});
};

export const createPost = (id,content) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    await axios.post(`/posts/${id}/comments`,JSON.stringify(content),config).then(res=> dispatch({
        type: CREATE_COMMENT,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
   // dispatch({type: IS_LOADED});
};

export const deleteComment = (postId, commentId) => async dispatch => {
    await axios.delete(`/posts/${postId}/comments/${commentId}`).then(res=> dispatch({
        type: DELETE_COMMENT,
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
