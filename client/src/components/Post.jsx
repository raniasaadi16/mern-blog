import React from 'react';
import Comments from './Comments';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../redux/actions/postActions';


export default function Post({post, comments}){
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const checkLike = () => {
        if(!user) return false
        if(post.likeCount.includes(user._id)){
            return true
        }else{
            return false
        }
    } 

    const handleLike = () => {
        if(!user) return false
        dispatch(likePost(post._id))
    }
    return (
        <div>          
            <div className="card mb-4 border-0">
                <img src={post.picture} className="card-img-top rounded" alt="..."/>
                <div className="card-body p-0 py-2">
                    <span className='fw-semibold'>by: <Link to={`/profile/${post.user._id}`} className='author primary-color'>{post.user.firstName} {post.user.lastName}</Link></span>
                    <span className="date fw-semibold ml-5"><i className="bi bi-calendar-date mr-2 primary-color"></i>{post.createdAt}</span>
                    <Link to={`/?category=${post.category._id}`} className="tag bg-pink rounded px-2 py-1 ml-5">#{post.category.name}</Link>
                    <div className="likes float-right fw-semibold">
                        <i className={`bi mr-2 primary-color ${checkLike() ? 'bi-heart-fill' : 'bi-heart'}`} style={{cursor: 'pointer'}} onClick={handleLike}></i>{post.likeCount.length}
                    </div>

                    <h2 className="card-title mt-3 fw-semibold">{post.title}</h2>
                    <div className="card-text" dangerouslySetInnerHTML={{__html: `${post.content}`}}>
                    </div>
                </div>
            </div>
            <Comments id={post._id} comments={comments}/>
        </div>
    );
}

