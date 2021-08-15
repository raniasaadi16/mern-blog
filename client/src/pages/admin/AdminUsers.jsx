import React from 'react';
import AdminSideBar from '../../components/admin/AdminSideBar';
import Users from '../../components/admin/Users';

export default function AdminUsers() {
    return (
        <div>
            <div className="row mx-0">
                <AdminSideBar link1={true}/>
                <div className="col-lg-9 px-5 py-3">
                    <Users/>
                </div>
            </div>
        </div>
    )
}
