import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { activateAccount, clearMsg } from '../redux/actions/authActions';
import { useParams } from 'react-router';

export default function ActivateUser() {
    const {activeToken} = useParams();
    const dispatch = useDispatch();
    const msg = useSelector(state => state.auth.msg)
    const err = useSelector(state => state.err);
    useEffect(() => {
        dispatch(activateAccount(activeToken));
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
                    <Link to="/login" onClick={()=> dispatch(clearMsg())}>login</Link>
                </div>
            )}
        </div>
    )
}
