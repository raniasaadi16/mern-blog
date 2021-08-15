import {useEffect} from 'react';
import TopBar from '../components/TopBar';
import PostSlide from '../components/PostSlide';
import Post from '../components/Post';
import SideBar from '../components/sideBar/SideBar';
import AboutSideBar from '../components/sideBar/AboutSideBar';
import PostLoading from '../components/PostLoading';
import { useParams } from 'react-router';
import {Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, getAllPosts } from '../redux/actions/postActions';
import { clearErrors } from '../redux/actions/errorsAction';
import { getCategories } from '../redux/actions/categoryActions';
import { getAllComments } from '../redux/actions/commentAction';

export default function SinglePost() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const isLoaded = useSelector(state => state.posts.isLoaded);
    const post = useSelector(state => state.posts.post);
    const isAuth = useSelector(state => state.auth.isAuth);
    const err = useSelector(state => state.err);
    const categories = useSelector(state => state.category.category);
    const comments = useSelector(state => state.comments.comments);
    const posts = useSelector(state => state.posts.posts);

    useEffect(() => {        
        dispatch(getPost(id));
    }, [isAuth,id]);
    
    useEffect(() => {
        dispatch(clearErrors());
        dispatch(getCategories());
        dispatch(getAllComments(id));
        
    }, [])
    useEffect(() => {
        post && dispatch(getAllPosts(`?category=${post.category._id}&limit=1`))
    }, [post])

    return (
        <div className='singlePost'>
            <TopBar/>
            <PostSlide/>
            {err.msg && <Redirect to='/404'/>}
            {!post || !isLoaded ? <PostLoading/> : (
                <div className="row mx-2" style={{marginTop:'70px'}}>
                    <div className="col-lg-8 pr-5">
                        <Post post={post} comments={comments && comments}/>
                    </div>
                    <div className="col-lg-4 sideBar rounded py-3">
                        <AboutSideBar user={post.user}/>
                        <SideBar posts={posts} categories={categories && categories}/>
                    </div>
                </div>
            )}
        </div>
    )
}
