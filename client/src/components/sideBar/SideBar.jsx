import React from 'react';
import PostCard3 from '../postCards/PostCard3';
import {Link} from 'react-router-dom';


export default function SideBar({posts,categories}) {
    
    return (
        <div>
            <h5 className='text-center fw-semibold mt-3'>Categories</h5>
            <ul>
                {categories && categories.map(category=> (
                    <li key={category._id}><Link to={`/?category=${category._id}`}>{category.name}</Link></li>
                ))}
            </ul>
            <h5 className='text-center fw-semibold mb-4 mt-3'>Related Posts</h5>
            {posts.length && posts.map(post => <PostCard3 key={post._id} post={post} />)}
        </div>
    )
}
