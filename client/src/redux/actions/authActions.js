import { IS_LOADED, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, ACTIVATE_ACCOUNT, ACTIVATE_FAIL, RESEND_ACTIVATE, CLEAR_MSG, ADD_PROFILE, FORGET_PASS, RESET_PASS, RESET_PASSGET, UPDATE_PASS, UPDATE_EMAIL, UPDATE_ME, CONFIRM_NEWEMAIL, DELETE_ME } from "./types";
import axios from 'axios';
import { returnErrors } from "./errorsAction";


export const loadUser = () => async dispatch => {
    
    await axios.get('/users/isLoggedin').then(res=> dispatch({
        type: USER_LOADED,
        payload: res.data
    })).catch(err=>{
        //dispatch(returnErrors(err.response.data.message,err.response.data.status));
        dispatch({type: AUTH_ERROR})
    });
    dispatch({type: IS_LOADED});
};

export const register = ({firstName,lastName,email,password,passwordConfirm})=> dispatch=>{
    //conver javascript object to json object
    const data = JSON.stringify({firstName,lastName,email,password,passwordConfirm});
    //console.log(data);
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    axios.post('/users/signup',data,config).then(res=> dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    })).catch(err => {
        dispatch(returnErrors(err.response.data.message,err.response.data.status,'REGISTER_FAIL'));
        dispatch({type: REGISTER_FAIL})
    })
};

export const login = ({email,password}) => dispatch => {
    const data = JSON.stringify({email,password});
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    axios.post('/users/login',data,config).then(res=> 
        dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data})
    ).catch(err=> {
        dispatch(returnErrors(err.response.data.message, err.response.data.status));
        dispatch({type: LOGIN_FAIL})
    })
};

export const activateAccount = (activeToken)=> dispatch=> {
    axios.get(`/users/activateAccount/${activeToken}`).then(res=> dispatch({
        type: ACTIVATE_ACCOUNT,
        payload: res.data
    })).catch(err=> {
        dispatch(returnErrors(err.response.data.message, err.response.data.status));
        dispatch({type: ACTIVATE_FAIL})
    })
};

export const addProfile = (data) => async dispatch=>{
    //const data = { picture, about, facebook, instagram, behance};
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    await axios.patch('/users/profile',data,config).then(res=> {
        dispatch({type: ADD_PROFILE,payload: res.data});
    }
    ).catch(err=> {
        dispatch(returnErrors(err.response.data.message, err.response.data.status));
    })
};

export const resendEmail = (email) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    await axios.post('/users/resendEmailToken',JSON.stringify(email),config).then(res=> {
        dispatch({type: RESEND_ACTIVATE,payload: res.data});
    }
    ).catch(err=> {
        dispatch(returnErrors(err.response.data.message, err.response.data.status));
    })
};

export const forgetPassword = (email) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    await axios.post('/users/forgetPassword',JSON.stringify(email),config).then(res=> {
        dispatch({type: FORGET_PASS,payload: res.data});
    }
    ).catch(err=> {
        dispatch(returnErrors(err.response.data.message, err.response.data.status));
    })
};

export const ressetPasswordGet = (token) => async dispatch => {
    await axios.get(`/users/ressetPassword/${token}`).then(res=> {
        dispatch({type: RESET_PASSGET,payload: res.data});
    }
    ).catch(err=> {
        dispatch(returnErrors(err.response.data.message, err.response.data.status, 'GET_RESSET'));
    })
};

export const ressetPassword = (token,{password, passwordConfirm}) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    await axios.patch(`/users/ressetPassword/${token}`,JSON.stringify({password, passwordConfirm}),config).then(res=> {
        dispatch({type: RESET_PASS,payload: res.data});
    }
    ).catch(err=> {
        dispatch(returnErrors(err.response.data.message, err.response.data.status));
    })
};

export const updatePassword = ({currentPass, password, passwordConfirm}) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    await axios.patch('/users/updatePassword',JSON.stringify({currentPass, password, passwordConfirm}),config).then(res=> {
        dispatch({type: UPDATE_PASS,payload: res.data});
    }
    ).catch(err=> {
        dispatch(returnErrors(err.response.data.message, err.response.data.status));
    })
};

export const updateEmail = ({newEmail, password}) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    await axios.patch('/users/updateEmail',JSON.stringify({newEmail, password}),config).then(res=> {
        dispatch({type: UPDATE_EMAIL,payload: res.data});
    }
    ).catch(err=> {
        dispatch(returnErrors(err.response.data.message, err.response.data.status));
    })
};

export const updateMe = ({firstName, lastName}) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    await axios.patch('/users/updateMe',JSON.stringify({firstName, lastName}),config).then(res=> {
        dispatch({type: UPDATE_ME,payload: res.data});
    }
    ).catch(err=> {
        dispatch(returnErrors(err.response.data.message, err.response.data.status));
    })
};

export const confirmNewEmail = (token)=> dispatch=> {
    axios.patch(`/users/confirmNewEmail/${token}`).then(res=> dispatch({
        type: CONFIRM_NEWEMAIL,
        payload: res.data
    })).catch(err=> {
        dispatch(returnErrors(err.response.data.message, err.response.data.status));
    })
};

export const logout = () => async dispatch => {
    await axios.get('/users/logout').then(res=> dispatch({
        type: LOGOUT_SUCCESS
    })).catch(err=> {
        dispatch(returnErrors(err.response.data.message, err.response.data.status))
    });
    dispatch({type: IS_LOADED});
}

export const clearMsg = () => {
    return {
        type: CLEAR_MSG
    }
}