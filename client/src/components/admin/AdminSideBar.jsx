import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AdminSideBar({link1,link2,link3}) {
    const user = useSelector(state => state.auth.user);

    return (
        <div className='col-lg-3 bg-dark py-5 adminBar text-white'>
            <img src={user.picture} alt="" className='rounded-circle mx-auto d-block' />
            <h4 className="text-center mt-2">Welcom {user.firstName}</h4>
            <div className="py-4 border-bottom border-white fw-semibold">
                <Link to='/admin/users' className={`d-block p-1 rounded ${link1 && 'active'}`} >Users</Link>
                <Link to='/admin/posts' className={`d-block p-1 mt-2 rounded ${link2 && 'active'}`} >Posts</Link>
                <Link to='/admin/categories' className={`d-block p-1 mt-2 rounded ${link3 && 'active'}`} >Categories</Link>
            </div>
            <div className="py-4 border-bottom border-white fw-semibold">
                <Link to='/' className='d-block p-1 primary-color' >Back to home</Link>
            </div>
        </div>
    )
}
