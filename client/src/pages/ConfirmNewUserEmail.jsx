import {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { confirmNewEmail, clearMsg } from '../redux/actions/authActions';

export default function ConfirmNewUserEmail() {
    const { token } = useParams();
    const dispatch = useDispatch();
    const msg = useSelector(state => state.auth.msg)
    const err = useSelector(state => state.err);
    useEffect(() => {
        dispatch(confirmNewEmail(token));
    }, [])
    return (
        <div>
            <h1>hi</h1>
            {err && (
                <h1>{err.msg}</h1>
            )}
            {msg && (
                <div>
                    <h1>{msg}</h1>
                    <Link to="/" onClick={()=> dispatch(clearMsg())}>Home</Link>
                </div>
            )}
        </div>
    )
}
