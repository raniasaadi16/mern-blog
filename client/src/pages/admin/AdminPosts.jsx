import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdminSideBar from '../../components/admin/AdminSideBar';
import Posts from '../../components/admin/Posts';
import { clearMsg } from '../../redux/actions/postActions';
import { clearErrors } from '../../redux/actions/errorsAction';

export default function AdminPosts() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMsg());
        dispatch((clearErrors()));
    }, [])
    return (
        <div>
            <div className="row mx-0">
                <AdminSideBar link2={true}/>
                <div className="col-lg-9 px-5 py-3">
                    <Posts/>
                </div>
            </div>
        </div>
    )
}
