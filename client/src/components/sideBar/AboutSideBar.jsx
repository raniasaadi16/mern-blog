import React from 'react'

export default function AboutSideBar({user}) {
    return (
        <div className='about'>
            <img src={user.picture} className='rounded-circle mx-auto d-block' alt="" />
            <h5 className='text-center fw-semibold mt-2'>About {user.firstName} {user.lastName}</h5>
            <p>
                {user.about}
            </p>
        </div>
    )
}
