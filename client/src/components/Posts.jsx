import { useEffect, useState } from 'react';
import PostCard2 from './postCards/PostCard2';
import PostLoading from './PostLoading';
import Filter from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, clearMsg } from '../redux/actions/postActions';
import { getCategories } from '../redux/actions/categoryActions';
import { clearErrors } from '../redux/actions/errorsAction';


const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const isLoaded = useSelector(state => state.posts.isLoaded);
    const category = useSelector(state => state.category.category);

    const [searchQuery, setsearchQuery] = useState('');
    useEffect(() => {
        dispatch(getAllPosts(searchQuery))
    }, [searchQuery]);
    useEffect(() => {
        dispatch(clearMsg());
        dispatch((clearErrors()));
        dispatch(getCategories());
    }, [])
    

    return (
        <div className='container mt-4'>
            {!isLoaded ? <PostLoading/> : <Filter searchQuery={searchQuery} setsearchQuey={setsearchQuery} category={category} />}
            <div className="posts mt-5">
                {!isLoaded ? <PostLoading/> : (
                    <div className="row">
                        {posts.length && posts.map(post => (
                            <div className="col-4" key={post._id}>
                                <PostCard2 post={post}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Posts;
