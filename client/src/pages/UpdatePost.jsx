import { useEffect } from 'react';
import { useParams } from 'react-router';
import {Redirect} from 'react-router-dom';
import Write from './Write';
import Loading from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { getPost } from '../redux/actions/postActions';
import { clearErrors } from '../redux/actions/errorsAction';
import { clearMsg } from '../redux/actions/postActions';

export default function UpdatePost() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const isLoaded = useSelector(state => state.posts.isLoaded);
    const post = useSelector(state => state.posts.post);
    const isAuth = useSelector(state => state.auth.isAuth);
    const err = useSelector(state => state.err);

    useEffect(() => {
        dispatch(clearErrors());
        dispatch(clearMsg());
        dispatch(getPost(id));
    }, []);

    return (
        <div>
            {!isAuth && <Redirect to='/login'/>}
            {err.msg && <Redirect to='/404'/>}
            {!post || !isLoaded ? <Loading text='Loading'/> : (
                <Write post={post} pageTitle='update your post!'/>
            )}
        </div>
    )
}
