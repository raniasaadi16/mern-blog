import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../redux/actions/authActions';

export default function ForgetPassword({setpopup}) {
    const [email, setemail] = useState('');
    const dispatch = useDispatch();

    const sendEmail = () => {
        dispatch(forgetPassword({email}));
        setpopup(false);
    }
    return (
        <div className="popup position-fixed w-100 h-100">
            <div className="px-4 py-4 mx-auto w-50 position-relative rounded content">
                <button className='btn ml-auto d-block' onClick={()=> {setpopup(false)}}>x</button>
                <h3 className="text-center">please put your email here</h3>
                <input type="email" className='w-100 border-bottom bg-transparent my-4'placeholder='put your email' onChange={e => setemail(e.target.value)}/>
                <button className='btn bg-pink mx-auto d-block px-4 py-1' onClick={sendEmail}>Send password email</button>
            </div>
        </div>
    )
}
