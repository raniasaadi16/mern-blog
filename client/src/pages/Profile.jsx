import { useEffect } from 'react';
import TopBar from '../components/TopBar';
import About from '../components/About';
import PostCard2 from '../components/postCards/PostCard2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/actions/postActions';
import { getUser } from '../redux/actions/usersActions';
import { useParams } from 'react-router-dom';
import { clearMsg } from '../redux/actions/postActions';

export default function Profile() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const currentUser = useSelector(state => state.auth.user);
    const posts = useSelector(state => state.posts.posts);

    const checkUser = (postUser) => {
        if(!currentUser) return false;
        if(currentUser._id === postUser._id) {
            return true;
        }
        return false
    }
    
    useEffect(() => {
        dispatch(getUser(id));
        user && dispatch(getAllPosts(`?user=${user._id}`));
    }, [id,user && user._id]);
    useEffect(() => {
        dispatch(clearMsg());
    }, []);
    return (
        <div className='profile'>
            <TopBar/>
            <div className="container mt-5">
                {user && <About postsNumber={posts.length && posts.length} user={user}/>}
                <div className="posts mt-5">
                    <div className="row">
                        {/* check if the user is loaded */}
                        {posts.length && posts.map(post => (
                            <div className="col-4" key={post._id}>
                                <PostCard2 post={post} enableDelUpda={checkUser(post.user)}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
