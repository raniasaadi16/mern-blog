import React from 'react';
import TopBar from '../components/TopBar';
import SettSideBar from '../components/SettSideBar';
import AddProfileCom from '../components/AddProfileCom';

export default function SettProfile() {
    return (
        <div className='pb-5'>
            <TopBar/>
            <div className="container mt-5">
                <div className="mx-5 bg-white rounded p-2">
                    <div className="row mx-0">
                        <SettSideBar link1={true}/>
                        <div className="col-lg-8 px-5 py-3">
                            <AddProfileCom title='EDIT YOUR PROFILE' skip={false}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
