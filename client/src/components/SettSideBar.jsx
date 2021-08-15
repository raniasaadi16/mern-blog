import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function SettSideBar({link1,link2,link3}) {
    const user = useSelector(state => state.auth.user);

    return (
        <div className='sett-bar col-lg-4 rounded py-4'>
            <div className="d-flex align-items-center border-bottom border-white pb-4 pt-2">
                <img src={user && user.picture} className='user-profile-sm rounded-circle' alt="" />
                <div className='text-box ml-3'>
                    <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
                    <p className='secondary-color mb-0'>{user && user.email}</p>
                </div>
            </div>
            <div className="py-4 border-bottom border-white">
                <h6 className='fw-semibold'>Last Time Loggedin</h6>
                <p className="mb-0 mt-3 secondary-color">{user && user.lastTimeLogedin}</p>
            </div>
            <div className="py-4 border-bottom border-white fw-semibold">
                <Link to='/settings/profile' className={`d-block p-1 rounded ${link1 && 'active'}`} >Edit Profile</Link>
                <Link to='/settings/infos' className={`d-block p-1 mt-2 rounded ${link2 && 'active'}`} >Edit Personal Informations</Link>
                <Link to='/settings/delete' className={`d-block p-1 mt-2 rounded ${link3 && 'active'}`} >Delete Account</Link>
            </div>
        </div>
    )
}
