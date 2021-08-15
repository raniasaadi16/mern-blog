import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import Loading from './Loading';
import ErrorAlert from './ErrorAlert';
import { clearErrors } from '../redux/actions/errorsAction';
import { updateMe, updatePassword, updateEmail, clearMsg } from '../redux/actions/authActions';
export default function SettUpdate() {
    // ****** redux
    const dispatch = useDispatch();
    const err = useSelector(state => state.err);
    const isAuth = useSelector(state => state.auth.isAuth);
    const user = useSelector(state => state.auth.user);
    const msg = useSelector(state => state.auth.msg);

    const [names, setnames] = useState({firstName: user ? user.firstName : '', lastName: user ? user.lastName : ''});
    const [passwords, setpasswords] = useState({currentPass: '', password: '', passwordConfirm: ''});
    const [setEmail, setsetEmail] = useState({newEmail : '', password: ''});
    const [emailPopup, setemailPopup] = useState(false);
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
    }, [])

    const closepopup = () => {
        setpopup(false);
        setloading(false);
        dispatch(clearMsg());
    }
    const submitMe = (e) => {
        e.preventDefault();
        dispatch(clearErrors());
        dispatch(clearMsg());
        setloading(true);
        dispatch(updateMe(names));
    }
    const submitPass = (e) => {
        e.preventDefault();
        dispatch(clearErrors());
        dispatch(clearMsg());
        setloading(true);
        dispatch(updatePassword(passwords));
    }
    const submitEmail = (e) => {
        e.preventDefault();
        dispatch(clearErrors());
        dispatch(clearMsg());
        setloading(true);
        dispatch(updateEmail(setEmail));
    }
    return (
        <div>
            {!isAuth && (
                <Redirect to='/login'/>
            )}
            {loading && <Loading text='Saving'/>}
            <h4 className="text-center fw-semibold">EDIT YOUR PERSONAL INFORMATIONS</h4>
            {msg && (
                <div>
                    <div className="popup position-fixed w-100 h-100" style={{display: popup ? 'block' : 'none'}}>
                        <div className="px-3 py-2 mx-auto w-25 position-relative rounded content">
                            <button className='btn ml-auto' onClick={()=> {setpopup(false); setloading(false)}}>x</button>
                            <h3 className='text-center'>{msg}</h3>
                            <button className='btn bg-pink mx-auto d-block px-4 py-1' onClick={closepopup}>ok</button>
                        </div>
                    </div>
                </div>  
            )}
            {err.msg && <ErrorAlert error={err.msg}/>}
            <form onSubmit={submitMe}>
                <p className='fw-semibold mt-3'>First Name</p>
                <input type="text" className='w-100 border rounded py-1 px-2' value={names.firstName} onChange={(e)=> setnames({...names, firstName: e.target.value})}/>
                <p className='fw-semibold mt-3'>Last Name</p>
                <input type="text" className='w-100 border rounded py-1 px-2' value={names.lastName} onChange={(e)=> setnames({...names, lastName: e.target.value})}/>
                <button className='btn bg-dark text-white mt-3 px-4' type='submit'>save</button>
            </form>
            <p className='fw-semibold mt-3'>Email</p>
            <input type="email" className='w-75 border rounded py-1 px-2' value={user && user.email} disabled={true}/>
            <button className='btn primary-color' onClick={()=> setemailPopup(true)}>EDIT</button>
            {emailPopup && (
                <form onSubmit={submitEmail}>
                    <p className='fw-semibold mt-3'>New Email</p>
                    <input type="email" className='w-100 border rounded py-1 px-2' onChange={e=> setsetEmail({...setEmail, newEmail: e.target.value})}/>
                    <p className='fw-semibold mt-3'>Password</p>
                    <input type="password" className='w-100 border rounded py-1 px-2' placeholder='****' onChange={e=> setsetEmail({...setEmail, password: e.target.value})}/>
                    <button className='btn bg-pink text-white mt-3 px-4' type='submit'>save</button>
                    <button className='btn bg-dark text-white mt-3 px-4 ml-3' onClick={()=> setemailPopup(false)}>cancel</button>
                </form>
            )}
            <form onSubmit={submitPass}>
                <p className='fw-semibold mt-3'>Current Password</p>
                <input type="password" className='w-100 border rounded py-1 px-2' placeholder='****' onChange={e=> setpasswords({...passwords, currentPass: e.target.value})}/>
                <p className='fw-semibold mt-3'>Password</p>
                <input type="password" className='w-100 border rounded py-1 px-2' placeholder='****' onChange={e=> setpasswords({...passwords, password: e.target.value})}/>
                <p className='fw-semibold mt-3'>Password Confirm</p>
                <input type="password" className='w-100 border rounded py-1 px-2' placeholder='****' onChange={e=> setpasswords({...passwords, passwordConfirm: e.target.value})}/>
                <button className='btn bg-dark text-white mt-3 px-4' type='submit'>save</button>
            </form>
        </div>
    )
}
