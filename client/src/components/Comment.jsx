import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../redux/actions/commentAction';

export default function Comment({comment, postId}) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const isAuth = useSelector(state => state.auth.isAuth);

    const handleDelet = () => {
        dispatch(deleteComment(postId, comment._id));
    }

    const checkUserComment = () => {
        if(user._id === comment.user._id || user.role === 'admin'){
            return <button className="btn primary-color float-right" onClick={handleDelet}>delete<i className="bi bi-archive ml-2"></i></button>
        }
    }
    return (
        <div className='comment my-3'>
            <div className="d-flex align-items-center">
                <img src={comment.user.picture} className='rounded-circle' alt="" />
                <div className="infos ml-3">
                    <p className="fw-semibold mb-1">{comment.user.firstName} {comment.user.lastName}</p>
                    <span className="date fw-semibold"><i className="bi bi-calendar-date mr-2"></i>{comment.createdAt}</span>
                </div>
            </div>
            {isAuth && checkUserComment()}
            <p className='mt-2'>{comment.content}</p>
        </div>
    )
}
