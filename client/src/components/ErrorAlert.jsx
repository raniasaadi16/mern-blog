import React from 'react';
import { useDispatch } from 'react-redux';
import { clearErrors } from '../redux/actions/errorsAction';

export default function ErrorAlert({error}) {
    const dispatch = useDispatch();
    return (
        <div className="alert popup d-flex justify-content-center align-items-center position-fixed w-100 h-100" role="alert">
            <div className='bg-danger text-white px-5 py-4 rounded'>
                {error}
                <button type="button" className="close" onClick={()=> dispatch(clearErrors())} >
                    X
                </button>
            </div>
        </div>
    )
}
