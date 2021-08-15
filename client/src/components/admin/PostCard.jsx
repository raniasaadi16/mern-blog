import { useEffect, useState } from 'react';
import Loading from '../Loading';
import ErrorAlert from '../ErrorAlert';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { deletePost, clearMsg } from '../../redux/actions/postActions';
import { clearErrors } from '../../redux/actions/errorsAction';


export default function PostCard({post}) {
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
        <div>
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
            <div className="card mb-3">
                <div className="row no-gutters" style={{overflow: 'hidden', height: '200px'}}>
                    <div className="col-md-4">
                        <img src={post.picture} alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title"><Link to={`/admin/posts/${post._id}`}>{post.title}</Link></h5>
                            <p className="tag bg-pink rounded px-2 py-0 d-inline">#{post.category.name}</p>
                            <p className="d-inline ml-5 primary-color">created by : {post.user.firstName} {post.user.lastName}</p>
                            <p className="d-inline ml-5 primary-color">{post.likeCount.length} likes</p>
                            <div className="card-text" dangerouslySetInnerHTML={{__html: `${post.content}`}} style={{overflow: 'hidden', height: '80px'}}></div>
                            <p className="card-text d-inline"><small className="text-muted">{post.createdAt}</small></p>
                            <button className="btn d-inline p-0 float-right primary-color" onClick={handleDelete}>delete <i className="bi bi-archive ml-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
