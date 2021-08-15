import React from 'react'

export default function Loading({text}) {
    return (
        <div className="spinner position-fixed w-100 h-100 d-flex justify-content-center align-items-center">
            <div>
                <div className="spinner-border secondary-color d-block mx-auto" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <h4 className='text-white fw-semibold mt-3'>{text}...</h4>
            </div>
        </div>
    )
}
