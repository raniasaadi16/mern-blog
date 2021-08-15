import { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import Loading from './Loading';
import ErrorAlert from './ErrorAlert';
import { useSelector, useDispatch } from 'react-redux';
import { addProfile, clearMsg } from '../redux/actions/authActions';
import { clearErrors, returnErrors } from '../redux/actions/errorsAction';

export default function AddProfileCom({title, skip, p}) {
    // ****** redux
    const dispatch = useDispatch();
    const err = useSelector(state => state.err);
    const isAuth = useSelector(state => state.auth.isAuth);
    const user = useSelector(state => state.auth.user);
    const msg = useSelector(state => state.auth.msg);
    // ******* states
    const [data, setdata] = useState({about: user ? user.about : '', facebook: user ? user.facebook : '', instagram: user ? user.instagram : '',behance:user ? user.behance : '',picture: user ? user.picture : ''});
    const [preview, setpreview] = useState(null);
    const [popup, setpopup] = useState(true);
    const [redirect, setredirect] = useState(false);
    const [loading, setloading] = useState(false);
    // ***** useEffect
    useEffect(() => {
        if(err.msg){
            setloading(false)
        }
    }, [err]);
    useEffect(() => {
        dispatch(clearMsg());
        dispatch((clearErrors()));
    }, [])
    // ***** functions
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearErrors());
        dispatch(clearMsg());
        setloading(true);

        const profile = new FormData();
        profile.append('about',data.about);
        profile.append('facebook',data.facebook);
        profile.append('instagram',data.instagram);
        profile.append('behance',data.behance);
        profile.append('picture',data.picture);
        dispatch(addProfile(profile));
       
        if(msg){
            setpopup(true)
        }
    }

    const upload = e => {
        var reader = new FileReader();
        var url = reader.readAsDataURL(e.target.files[0]);
        if(e.target.files[0].type.split('/')[0] == 'image'){
            reader.onloadend = function (e) {
                setpreview(reader.result);
            }
            setdata({...data,picture: e.target.files[0]});
        }else{
            dispatch(returnErrors('please upload picture','fail'))
        }
    }
    
    const closepopup = () => {
        setpopup(false);
        setloading(false);
        skip && setredirect(true);
    }


    return (
        <div>
            {!isAuth && (
                <Redirect to='/login'/>
            )}
            {loading && <Loading text='Saving'/>}
            {msg && (
                <div>
                    <div className="popup position-fixed w-100 h-100" style={{display: popup ? 'block' : 'none'}}>
                        <div className="px-3 py-2 mx-auto w-25 position-relative rounded content">
                            <button className='btn ml-auto' onClick={()=> {setpopup(false); setloading(false)}}>x</button>
                            <h3 className='text-center'>{msg}</h3>
                            <button className='btn bg-pink mx-auto d-block px-4 py-1' onClick={closepopup}>ok</button>
                        </div>
                    </div>
                    {redirect && <Redirect to='/'/>}
                </div>  
            )}
            <h4 className="text-center fw-semibold">{title}</h4>
            {err.msg && <ErrorAlert error={err.msg}/>}
            <p className='text-center'>{p && p}</p>
            <form className="mt-3" onSubmit={handleSubmit} encType='multipart/form-data' >
                <div className="d-flex align-items-center">
                    <img src={preview ? preview : data.picture} className='user-profile rounded-circle' alt="" />
                    <input type="file" id='file' style={{display:'none'}} onChange={upload} />
                    <label htmlFor="file" className='primary-color ml-3' style={{cursor:'pointer'}}><u>Change your picture</u></label>
                </div>
                <p className='fw-semibold mt-3'>About</p>
                <textarea name="about" rows="5" className='w-100 border rounded' value={data.about} onChange={(e)=> setdata({...data,about: e.target.value})} ></textarea>
                <p className='fw-semibold mt-3'>Facebook</p>
                <input type="text" className='w-100 border rounded py-1' value={data.facebook} onChange={(e)=> setdata({...data,facebook: e.target.value})} />
                <p className='fw-semibold mt-3'>Behance</p>
                <input type="text" className='w-100 border rounded py-1' value={data.behance} onChange={(e)=> setdata({...data,behance: e.target.value})} />
                <p className='fw-semibold mt-3'>Instagram</p>
                <input type="text" className='w-100 border rounded py-1' value={data.instagram} onChange={(e)=> setdata({...data,instagram: e.target.value})}/>
                <div className="buttons mt-4">
                    <button className='btn bg-pink px-4' type='submit'>{loading ? '...saving' : 'save'}</button>
                    {skip && (
                        <button className='btn bg-dark text-white ml-3 px-4'>skip</button>
                    )}
                </div>
            </form>
        </div>
    )
}
