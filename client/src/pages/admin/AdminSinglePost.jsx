import {useEffect} from 'react';
import AdminSideBar from '../../components/admin/AdminSideBar';
import Post from '../../components/Post';
import PostLoading from '../../components/PostLoading';
import { useParams } from 'react-router';
import {Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPost } from '../../redux/actions/postActions';
import { clearErrors } from '../../redux/actions/errorsAction';

export default function AdminSinglePost() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const isLoaded = useSelector(state => state.posts.isLoaded)
    const posts = useSelector(state => state.posts.posts);
    const err = useSelector(state => state.err);

    useEffect(() => {
        dispatch(clearErrors());
        dispatch(getPost(id));
    }, []);

    return (
        <div className='singlePost'>
            {err.msg && <Redirect to='/404'/>}
            <div className="row mx-0">
                <AdminSideBar link2={true}/>
                {isLoaded ? <PostLoading/> : (
                    <div className="col-lg-9" style={{marginTop:'70px'}}>
                        <Post post={posts}/>
                    </div>
                )}
            </div>
        </div>
    )
}
