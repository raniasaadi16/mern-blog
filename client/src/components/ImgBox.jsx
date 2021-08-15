import React from 'react';
import {Link} from 'react-router-dom';

export default function ImgBox({img, title}) {
    return (
        <div className='img-box p-5' style={{backgroundImage: ` linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(./img/${img}.jpg)`}}>
            <Link to='/'><img src="./img/foody2.svg" alt="" /></Link>
            <div className="text-box mt-5">
                <h2 className='fw-semibold'>{title}</h2>
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc, mauris nisl integer lacus, sed tortor eget feugiat.</h4>
            </div>
        </div>
    )
}
