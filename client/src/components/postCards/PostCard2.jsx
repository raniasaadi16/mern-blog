import { useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import Loading from '../Loading';
import ErrorAlert from '../ErrorAlert';
import { useDispatch, useSelector} from 'react-redux';
import { deletePost, clearMsg } from '../../redux/actions/postActions';
import { clearErrors } from '../../redux/actions/errorsAction';

export default function PostCard2({post,enableDelUpda}) {
    // ***** redux
    const dispatch = useDispatch();
    const err = useSelector(state => state.err);
    const msg = useSelector(state => state.posts.msg);

    // ***** state
    const [popup, setpopup] = useState(true);
    const [loading, setloading] = useState(false);
    // ***** useEffect
    useEffect(() => {
        if(err.msg){
            setloading(false)
        }
    }, [err]);
    // ***** function
    const handleDelete = () => {
        dispatch(clearErrors());
        dispatch(clearMsg());
        setloading(true);

        dispatch(deletePost(post._id));

        if(msg){
            setpopup(true)
        }
    }

    return (
        <div className="card mb-4 border-0">
            {loading && <Loading text='deleting'/>}
            {err.msg && <ErrorAlert error={err.msg}/>}
            {msg && (
                <div>
                    <div className="popup position-fixed w-100 h-100" style={{display: popup ? 'block' : 'none'}}>
                        <div className="px-3 py-2 mx-auto w-25 position-relative rounded content">
                            <button className='btn ml-auto' onClick={()=> {setpopup(false); setloading(false);dispatch(clearMsg());}}>x</button>
                            <h3 className='text-center'>{msg}</h3>
                            <button className='btn bg-pink mx-auto d-block px-4 py-1' onClick={()=> {setpopup(false); setloading(false);dispatch(clearMsg());}}>ok</button>
                        </div>
                    </div>
                </div>  
            )}
            {enableDelUpda && (
                <div className='position-absolute bg-white' style={{zIndex: '100'}}>
                    <button className="btn primary-color" onClick={handleDelete}>delete<i className="bi bi-archive ml-2"></i></button>
                    <Link to={`/posts/${post._id}/update`} className="btn primary-color">update<i className="bi bi-gear ml-2"></i></Link>
                </div>
            )}
            <div style={{overflow:'hidden'}}>
                <img src={post.picture} className="card-img-top px-2 pt-2" alt="..."/>
            </div>
            <div className="card-body py-2">
                <span className='fw-semibold'>by: <Link to={`/profile/${post.user._id}`} className='author primary-color'>{post.user.firstName} {post.user.lastName}</Link></span>
                <span className="date float-right fw-semibold">{post.createdAt}</span>
                <Link to={`/posts/${post._id}`}>
                    <h5 className="card-title mt-2 fw-semibold">{post.title}</h5>
                </Link>
                <div className="card-text mb-3" dangerouslySetInnerHTML={{__html: `${post.content}`}} style={{overflow: 'hidden', height: '50px'}}></div>
                <Link to={`/?category=${post.category._id}`} className="tag bg-pink rounded px-2 py-1">#{post.category.name}</Link>
                <div className="likes float-right fw-semibold"><i className="bi bi-heart-fill mr-2 primary-color"></i>{post.likeCount.length}</div>
            </div>
        </div>
    )
}
