import React from 'react';
import TopBar from '../components/TopBar';
import SettSideBar from '../components/SettSideBar';
import SettUpdate from '../components/SettUpdate';

export default function SettInfos() {
    return (
        <div className='pb-5'>
            <TopBar/>
            <div className="container mt-5">
                <div className="mx-5 bg-white rounded p-2">
                    <div className="row mx-0">
                        <SettSideBar link2={true}/>
                        <div className="col-lg-8 px-5 py-3">
                            <SettUpdate/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
