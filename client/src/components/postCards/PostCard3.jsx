import React from 'react';
import {Link} from 'react-router-dom';

export default function PostCard3({post}) {
    return (
        <div className='horizCard my-3 px-2'>
            <div className="mycard mx-1 position-relative overflow-hidden">
                <Link to={`/posts/${post._id}`}>
                    <img src={post.picture} className='rounded' alt="" />
                    <div className="text-box position-absolute px-3">
                        <p className='mb-0'>{post.title}</p>
                        <p className="tag mb-0">#{post.category.name}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
