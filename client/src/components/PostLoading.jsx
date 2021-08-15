import React from 'react'

export default function PostLoading() {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div>
                <div className="spinner-border secondary-color d-block mx-auto" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <h4 className='fw-semibold mt-3'>Loading...</h4>
            </div>
        </div>
    )
}
