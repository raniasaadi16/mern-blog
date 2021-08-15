import React from 'react';
import {Link} from 'react-router-dom';


export default function SocialMedia() {
    return (
        <div>
            <h5 className='text-center fw-semibold mt-3'>Social Media</h5>
            <div className='d-flex justify-content-center'>
                <Link to='/'><i className="bi bi-facebook mx-2 primary-color" style={{fontSize:'30px'}}></i></Link>
                <Link to='/'><i className="bi bi-instagram mx-2 primary-color" style={{fontSize:'30px'}}></i></Link>
            </div>
        </div>
    )
}
