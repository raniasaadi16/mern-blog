import React from 'react';
import { Link } from 'react-router-dom';
import Comments from '../Comments';

export default function SinglePost({post}) {
    return (
        <div>          
            <div className="card mb-4 border-0">
                <img src={post.picture} className="card-img-top rounded" alt="..."/>
                <div className="card-body p-0 py-2">
                    <span className='fw-semibold'>by: <Link to='/' className='author primary-color'>{post.user.firstName} {post.user.lastName}</Link></span>
                    <span className="date fw-semibold ml-5"><i className="bi bi-calendar-date mr-2 primary-color"></i>May 19</span>
                    <p className="tag bg-pink rounded px-2 py-1 ml-5">#{post.category.name}</p>
                    <div className="likes float-right fw-semibold primary-color">
                        {post.likeCount.length} LIKES
                    </div>

                    <h2 className="card-title mt-3 fw-semibold">{post.title}</h2>
                    <div className="card-text" dangerouslySetInnerHTML={{__html: `${post.content}`}}>
                    </div>
                </div>
            </div>
            <Comments id={post._id}/>
        </div>
    )
}
