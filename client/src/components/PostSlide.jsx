import { useState, useEffect } from 'react';
import PostCard1 from './postCards/PostCard1';
import PostLoading from './PostLoading';
import { useDispatch, useSelector } from 'react-redux';
import { getSlidPosts } from '../redux/actions/postActions';

export default function PostSlide() {
    const dispatch = useDispatch();
    const slidPosts = useSelector(state => state.posts.slidPosts);
    const [state, setstate] = useState({
        index: 0,
        translate: 0
    });
    const width = 245; // dont forget to rezise the cat for responsivity

    useEffect(() => {
        dispatch(getSlidPosts());
    }, [])

    const nextSlide = ()=>{
        setstate({index: state.index + 1, translate: -width- state.index*width});
    }
    const prevSlide = ()=>{
        setstate({index: state.index - 1, translate: -state.index*width+ width});
    };
    //console.log(window.innerWidth);// inerwidth/2= translate(0),(innerwidth/2)/width= nmber of post*2 displayed,index
    // lenght - nbrofpostsdisplayed -1, nbrofpostsdisplayed=innerwidth/width => like script js
    //console.log(window.innerWidth/width);
    //console.log(postsLength.length - Math.ceil(window.innerWidth/width) -2);


    return (
        <div> 
            {!slidPosts ? <PostLoading/> : (
                <div className='overflow-hidden position-relative'>
                    <div className='postSlide d-flex justify-content-center mt-3' style={{transform: `translateX(${state.translate}px)`}}>
                        {slidPosts.map(post => <PostCard1 key={post._id} post={post} width={width}/>)}
                    </div>
                    <i className="bi bi-arrow-left arrows position-absolute rounded prev" onClick={prevSlide}></i>
                    <i className="bi bi-arrow-right arrows position-absolute rounded next" onClick={nextSlide}></i>
                </div>
            )}
        </div>
    )
}
