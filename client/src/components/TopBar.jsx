import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';

export default function TopBar() {
    const isAuth = useSelector(state => state.auth.isAuth);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const checkAdmin = () => {
        if(user && user.role === 'admin') return true;
        return false;
    }
    return (
        <nav className="topBar">
            <div className='border-bottom'>
                <div className="navbar navbar-light">
                    <Link to='/' className='navbar-brand'>
                        <img src="https://res.cloudinary.com/ddu6qxlpy/image/upload/v1627332291/miikvst92vdtr2jq5u7c.svg" alt="" />
                    </Link>
                    <input className="form-control w-auto bg-gris border-0" type="search" placeholder="Search" aria-label="Search"/>
                </div>
            </div>
            <div className="navbar nav-2">
                <ul className='d-flex p-0 m-0'>
                    <li className='pr-3'><Link to='/'>HOME</Link></li>
                    <li className='pr-3'><Link to='/about'>OUR STORY</Link></li>
                    <li className='pr-3'><Link to='/write'>WRITE</Link></li>
                    <li className='pr-3'><Link to='/'>CONTACT US</Link></li>
                </ul>
                <div className='d-inline'>
                    {isAuth ?  (
                        <div>
                            <div className="dropdown d-inline ml-2">
                                <img src={user && user.picture} className='user rounded-circle' alt="" />
                                <button className="dropdown-toggle p-0 px-2 ml-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {user && `${user.firstName} ${user.lastName}`}
                                </button>
                                <div className="dropdown-menu mt-4 mr-2" style={{left: '-26px'}} aria-labelledby="dropdownMenuButton">
                                    <Link to={`/profile/${user._id}`} className="dropdown-item">Profile</Link>
                                    <Link to='/settings/profile' className="dropdown-item border-bottom">Settings</Link>
                                    {checkAdmin() && (
                                        <Link to='/admin/users' className="dropdown-item border-bottom">ADMIN DASHBOARD</Link>
                                    )}
                                    <button className="dropdown-item" onClick={()=> dispatch(logout())}>Logout</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Link to='/login' className='mr-4 sign bg-pink p-1 rounded'>Sign in</Link>
                            <Link to='/signup' className='bg-pink1 sign rounded'>Sign up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
