import { useState } from 'react';
import Comment from './Comment';
import ErrorAlert from './ErrorAlert';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/actions/commentAction';

export default function Comments({id,comments}) {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth);
    const err = useSelector(state => state.err);
    const [content, setcontent] = useState('');


    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createPost(id,{content}));
        setcontent('');
    }
    return (
        <div className='comments mt-4 mb-5 pb-5'>
            <h4 className='fw-semibold'>{comments.length} comments</h4>
            {comments.map(comment => <Comment key={comment._id} comment={comment} postId={id} />)}

            {isAuth && (
                <div className='pt-2'>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Leave Your Comment' className='w-100 p-2 border bg-transparent' value={content} onChange={e => setcontent(e.target.value)} />
                        {err.msg && <ErrorAlert error={err.msg}/>}
                        <button className='bg-pink border-0 float-right mt-2 rounded py-1 px-3' type='submit'>Submit</button>
                    </form>
                </div>
            ) }
        </div>
    )
};
