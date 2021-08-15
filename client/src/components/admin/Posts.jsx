import { useEffect } from 'react';
import PostCard from './PostCard';
import PostLoading from '../PostLoading';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../redux/actions/postActions';


const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const isLoaded = useSelector(state => state.posts.isLoaded);

    useEffect(() => {
        dispatch(getAllPosts(''))
    }, []);

    

    return (
        <div className='container mt-4'>
            <h3 className='mb-4'>Posts : <span className='primary-color'>{posts.length && posts.length} post</span></h3>
            <div className="admin-posts mt-5">
                {!isLoaded ? <PostLoading/> : (
                    <div className="row">
                        {posts.length && posts.map(post => (
                            <PostCard post={post} key={post._id}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Posts;
