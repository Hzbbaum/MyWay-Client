import React from 'react'
import { LOGOUT_TRIPS, LOGOUT_USER, SET_ADMIN } from '../../redux/actionTypes';
import { useDispatch } from 'react-redux';
import { LOGGED_OUT } from '../../redux/appStateTypes';

const LogoutButton = () => {

    const dispatch = useDispatch();

    const logOutHandler = (e)=>{
        dispatch({type:LOGOUT_TRIPS});
        dispatch({type:LOGOUT_USER});
        dispatch({type:SET_ADMIN, payload:LOGGED_OUT});
        localStorage.setItem("refreshToken", null);
        localStorage.setItem("accessToken", null);
      }

    return (
        <div>
            <button className = "login" onClick = {logOutHandler}> logout</button>
        </div>
    )
}

export default LogoutButton
