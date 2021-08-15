import React from 'react';
import AdminSideBar from '../../components/admin/AdminSideBar';
import Categories from '../../components/admin/Categories';

export default function AdminCategories() {
    return (
        <div>
            <div className="row mx-0">
                <AdminSideBar link3={true}/>
                <div className="col-lg-9 px-5 py-3">
                    <Categories/>
                </div>
            </div>
        </div>
    )
}
