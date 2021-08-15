import {useState,useEffect} from 'react';
import ImgBox from '../components/ImgBox';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import {Link, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {register, resendEmail, clearMsg} from '../redux/actions/authActions';
import { clearErrors } from '../redux/actions/errorsAction';

export default function Signup() {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('');
    const [popup, setpopup] = useState(true);
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
    const err = useSelector(state => state.err);
    const user =useSelector(state=> state.auth.user);
    const isAuth =useSelector(state=> state.auth.isAuth);
    const msg = useSelector(state=> state.auth.msg);

   // ***** useEffect
    useEffect(() => {
        if(err.msg){
            setloading(false)
        };
        if(msg){
            setpopup(true);
            setfirstName('');
            setlastName('');
            setemail('');
            setpassword('');
            setpasswordConfirm('');
        }
    }, [err,msg]);

    const handleSubmit = e=>{
        e.preventDefault();
        dispatch(clearErrors());
        dispatch(clearMsg());
        setloading(true);

        const newUser = {firstName,lastName,email,password,passwordConfirm};
        dispatch(register(newUser));
    }
    const resendToken = () =>{
        dispatch(clearErrors());
        dispatch(clearMsg());
        dispatch(resendEmail({email : user.email}));
    }

    return (
        <div className='login'>
            {isAuth && <Redirect to='/'/>}
            {loading && <Loading text='Processing'/>}
            <ImgBox img='signup' title='Hello Word !'/>
            <div className='px-5 py-4'>
                <h2 className="text-center fw-semibold">SIGN UP</h2>
                <div>
                    {msg && (
                        <div className="popup position-fixed w-100 h-100" style={{display: popup ? 'block' : 'none'}}>
                            <div className="px-3 py-2 mx-auto w-25 position-relative rounded content">
                                <button className='btn ml-auto' onClick={()=> {setpopup(false); setloading(false)}}>x</button>
                                <h3 className='text-center'>{msg} to this email : {user.email}</h3>
                                <button className='btn bg-pink mx-auto d-block px-4 py-1' onClick={resendToken}>Resend email</button>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {err.msg && <ErrorAlert error={err.msg}/>}
                </div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col">
                                <input type="text" value={firstName} className='w-100 border-bottom bg-transparent my-4' placeholder='First Name' onChange={e=>setfirstName(e.target.value)} />
                            </div>
                            <div className="col">
                                <input type="text" value={lastName} className='w-100 border-bottom bg-transparent my-4' placeholder='Last Name' onChange={e=>setlastName(e.target.value)} />
                            </div>
                        </div>
                        <input type="email" value={email} className='w-100 border-bottom bg-transparent my-4' placeholder='Your Email' onChange={e=>setemail(e.target.value)} />
                        <input type="password" value={password} className='w-100 border-bottom bg-transparent my-4'  placeholder='Your Password' onChange={e=>setpassword(e.target.value)}/>
                        <input type="password" value={passwordConfirm} className='w-100 border-bottom bg-transparent my-4'  placeholder='Confirm Password' onChange={e=> setpasswordConfirm(e.target.value)} />
                        <button className='btn w-100 py-1 mt-4 mb-2 bg-pink fw-semibold' type='submit'>{loading ? '...loading' : 'SIGN UP'}</button>
                        <span>You have alreadu an account? <Link to="/login" className='primary-color'>LOGIN</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}
