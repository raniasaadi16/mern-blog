import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from '../components/TopBar';
import PostSlide from '../components/PostSlide';
import SideBar from '../components/sideBar/SideBar';
import AboutSite from '../components/AboutSite';
import SocialMedia from '../components/sideBar/SocialMedia';
import { getAllPosts } from '../redux/actions/postActions';
import { getCategories } from '../redux/actions/categoryActions';

export default function AboutUs() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.category);
    const posts = useSelector(state => state.posts.posts);

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getAllPosts('?sort=likeCount&limit=4'));
    }, [])
    return (
        <div className='aboutUs'>
            <TopBar/>
            <PostSlide/>
            <div className="row mx-2" style={{marginTop:'70px'}}>
                <div className="col-lg-8 pr-5">
                    <AboutSite/>
                </div>
                <div className="col-lg-4 sideBar rounded py-3">
                    <SocialMedia/>
                    <SideBar posts={posts} categories={categories && categories}/>
                </div>
            </div>
        </div>
    )
}
