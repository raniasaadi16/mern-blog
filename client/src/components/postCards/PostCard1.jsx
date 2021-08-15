import React from 'react';
import {Link} from 'react-router-dom';


export default function PostCard1({width,post}) {

    return (
        <div>
            <div className="mycard mx-1" style={{width:`${width}px`}}>
                <Link to={`/posts/${post._id}`}>
                    <img src={post.picture} className='position-absolute rounded' alt="" />
                    <div className="text-box position-absolute">
                        <p className='mb-0'>{post.title}</p>
                        <p className="tag mb-0">#{post.category.name}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
