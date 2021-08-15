import { useEffect, useState } from 'react';
import Loading from '../Loading';
import ErrorAlert from '../ErrorAlert';
import { useDispatch, useSelector} from 'react-redux';
import { deleteUser, clearMsg } from '../../redux/actions/usersActions';
import { getAllUsers } from '../../redux/actions/usersActions';
import { clearErrors } from '../../redux/actions/errorsAction';

export default function Users() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const msg = useSelector(state => state.users.msg);
    const err = useSelector(state => state.err);
    // ***** state
    const [popup, setpopup] = useState(true);
    const [loading, setloading] = useState(false);

    // ***** useEffect
    useEffect(() => {
        if(err.msg){
            setloading(false)
        }
        if(msg){
            setpopup(true)
        }
    }, [err,msg]);
    useEffect(() => {
        dispatch(clearMsg());
        dispatch((clearErrors()));
        dispatch(getAllUsers());
    }, []);
    // ***** function
    const checkAdmin = (user) => {
        if(user.role === 'admin') return false;
        return true;
    }
    const handleDelete = (id) => {
        dispatch(clearErrors());
        dispatch(clearMsg());
        setloading(true);

        dispatch(deleteUser(id));
    }

    return (
        <div className='pt-5 pb-3'>
            <h3>users {users.length && users.length}</h3>
            {loading && <Loading text='deleting'/>}
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
            {!users.length ? <Loading text='loading'/> : (
                <div className="users mt-5">
                    {users.map(user => (
                        <div className="d-flex align-items-center my-3" key={user._id}>
                            {err.msg && <ErrorAlert error={err.msg}/>}
                            <img src={user.picture} className='rounded' alt="" />
                            <div className="text-box ml-3">
                                <p className='mb-0'>id: #{user._id} </p>
                                <p className='mb-0'>{user.firstName} {user.lastName}</p>
                                <p className='mb-0'>role: {user.role}</p>
                                <p className='mb-0'>active: {`${user.active}`}</p>
                                {checkAdmin(user) && (
                                    <button className='btn p-0 primary-color' onClick={() => handleDelete(user._id)}>delete <i className="bi bi-archive ml-2"></i></button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
