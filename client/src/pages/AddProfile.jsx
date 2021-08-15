import React from 'react';
import TopBar from '../components/TopBar';
import AddProfileCom from '../components/AddProfileCom';

export default function AddProfile() {
    return (
        <div className='pb-5'>
            <TopBar/>
            <div className='addProfile py-3 px-5 rounded mt-5 container mx-auto w-50'>
                <AddProfileCom title='Welcome !' p='please complete your profile' skip={true} />
            </div>
        </div>
    )
}
