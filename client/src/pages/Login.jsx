import {useState, useEffect} from 'react';
import ImgBox from '../components/ImgBox';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearMsg, login} from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorsAction';
import ForgetPassword from '../components/ForgetPassword';

export default function Login() {
    // ***** state
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [popup, setpopup] = useState(false);
    const [loading, setloading] = useState(false);
    // ***** redux
    const err = useSelector(state => state.err);
    const isAuth = useSelector(state => state.auth.isAuth);
    const currentUser = useSelector(state => state.auth.user);
    const msg = useSelector(state => state.auth.msg);
    const dispatch = useDispatch();
    // ***** useEffect
    useEffect(() => {
        dispatch(clearErrors());
        dispatch(clearMsg());
    }, [])
    useEffect(() => {
        if(err.msg){
            setloading(false);
            setpopup(false);
        }
    }, [err]);
    // ***** functions
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(clearErrors());
        setloading(true);
        const user = {email,password};
        dispatch(login(user));
    };
    const checkUser = ()=> {
        if(isAuth && currentUser.lastTimeLogedin){
            return <Redirect to='/'/>
        }else if(isAuth && !currentUser.lastTimeLogedin){
            return <Redirect to='/addProfile'/>
        }
    }


    return (
        <div className='login'>
            {checkUser()}
            {loading && <Loading text='Processing'/>}
            {popup && (
                <ForgetPassword setpopup={setpopup} />
            )}
            <div className='px-5 py-4'>
                <h2 className="text-center fw-semibold">LOGIN</h2>
                {msg && (
                        <div className="alert alert-success" role="alert">
                            {msg} to this email {currentUser}
                            <button type="button" className="close" onClick={()=> dispatch(clearMsg())} >
                                X
                            </button>
                        </div>
                )}
                {err.msg && <ErrorAlert error={err.msg}/>}
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input type="email" value={email} className='w-100 border-bottom bg-transparent my-4' placeholder='Your Email' onChange={e=> setemail(e.target.value)} />
                        <input type="password" value={password} className='w-100 border-bottom bg-transparent my-4'  placeholder='Your Password' onChange={e=> setpassword(e.target.value)} />
                        <button className='btn w-100 py-1 mt-4 mb-2 bg-pink fw-semibold' type='submit'>{loading ? '...loading' : 'Login'}</button>
                        <span>You forgot your password ? <a className='btn p-0 primary-color' style={{fontSize: '16px'}} onClick={() => {setpopup(true); dispatch(clearMsg()); dispatch(clearErrors())}}>Reset password</a></span>
                    </form>
                </div>
            </div>
            <ImgBox img='login' title='Hello , Freind!'/>
        </div>
    )
}
