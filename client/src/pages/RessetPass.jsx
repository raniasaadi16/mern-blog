import {useEffect, useState} from 'react';
import TopBar from '../components/TopBar';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { clearErrors } from '../redux/actions/errorsAction';
import { ressetPassword, ressetPasswordGet, logout, clearMsg } from '../redux/actions/authActions';
import { useParams } from 'react-router';

export default function RessetPass() {
    const {token} = useParams();
    const dispatch = useDispatch();
    const msg = useSelector(state => state.auth.msg)
    const err = useSelector(state => state.err);
    const [passwords, setpasswords] = useState({password: '', passwordConfirm: ''});
    const [popup, setpopup] = useState(true);
    const [loading, setloading] = useState(false);
    const [redirect, setredirect] = useState(false);

    useEffect(() => {
        dispatch(logout());
        dispatch(ressetPasswordGet(token));
    }, []);
    useEffect(() => {
        if(err.msg){
            setloading(false)
        }
    }, [err]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(clearErrors());
        dispatch(clearMsg());
        setloading(true);
        dispatch(ressetPassword(token, passwords))
    }
    const closepopup = () => {
        setpopup(false);
        setloading(false);
        setredirect(true);
    }
    return (
        <div>
            <TopBar/>
            {loading && <Loading text='Saving'/>}
            {msg && (
                <div>
                    <div className="popup position-fixed w-100 h-100" style={{display: popup ? 'block' : 'none'}}>
                        <div className="px-3 py-2 mx-auto w-25 position-relative rounded content">
                            <button className='btn ml-auto' onClick={closepopup}>x</button>
                            <h3 className='text-center'>{msg}</h3>
                            <button className='btn bg-pink mx-auto d-block px-4 py-1' onClick={closepopup}>ok</button>
                        </div>
                    </div>
                    {redirect && <Redirect to='/'/>}
                </div>  
            )}
            <div className='py-3 px-5 rounded mt-5 container mx-auto w-50 bg-white'>
                {err.id === 'GET_RESSET' ? (
                    <div className="alert alert-danger">{err.msg}</div>
                ) : (
                    <div>
                        {err.msg && <ErrorAlert error={err.msg}/>}
                        <h5 className='text-center'>Reset Your Password</h5>
                        <form className="mt-4" onSubmit={handleSubmit}>
                        <p className='fw-semibold mt-3'>Password</p>
                        <input type="password" className='w-100 border rounded p-1' placeholder='****' onChange={(e)=> setpasswords({...passwords, password: e.target.value})}/>
                        <p className='fw-semibold mt-3'>Password Confirm</p>
                        <input type="password" className='w-100 border rounded p-1' placeholder='****' onChange={(e)=> setpasswords({...passwords, passwordConfirm: e.target.value})}/>
                        <button className='btn bg-dark text-white mt-3 px-4' type='submit'>save</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
