import React from 'react';
import Loading from './Loading';
import {Link} from 'react-router-dom';


export default function About({postsNumber, user}) {

    return (
        <div>
            {!user ? <Loading text='searching'/> : (
                <div className='about rounded p-3 px-5'>
                    <img src={user.picture} className='d-block mx-auto rounded-circle' alt="" />
                    <h3 className='fw-semibold text-center mt-2'>About {user.firstName}</h3>
                    <p className="mt-3">
                        {user.about}
                    </p>
                    <p className='fw-semibold'><span className='primary-color mr-2'>Number of posts :</span>{postsNumber} posts</p>
                    <p className='fw-semibold'>
                        <span className='primary-color mr-2'>
                            Social media :
                        </span>
                        {user.facebook && <Link to='/'><i className="bi bi-facebook mx-2"></i></Link>}
                        {user.instagram && <Link to='/'><i className="bi bi-instagram mx-2"></i></Link>}   
                    </p>
                </div>
            ) }
          
        </div>
    )
}
