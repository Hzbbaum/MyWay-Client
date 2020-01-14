import React, { useState } from 'react'
import { useDispatch} from "react-redux";
import { LOGIN, SET_ADMIN } from "../redux/actionTypes";
import { ADMIN, LOGGED_IN } from '../redux/appStateTypes';

const Register = () => {
    
    let uname;
    let fname;
    let lname;
    let pword;
    const [message, setmessage] = useState("");
  
    const dispatch = useDispatch();

    const submitHandler = e => {
      e.preventDefault();
      e.target[0].value = "";
      e.target[1].value = "";
      const body = {};
      body.uname = uname;
      body.lname = lname;
      body.fname = fname;
      body.pword = pword;
      fetch('http://localhost:3000/auth/register', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      .then((response) => {
          // we want the response even on error because it contains message
          let json = response.json();
          if ((response.status >= 200 && response.status < 300)||(response.status >= 400 && response.status < 410)) {
            return json;
          } else {
            return json.then(Promise.reject.bind(Promise));
          }
      })
      .then((data) => {
        if (data.success){
            setmessage("");
            dispatch({type: LOGIN, payload:data.user});
            const newAppState = data.user.isadmin ? ADMIN:LOGGED_IN;
            dispatch({type: SET_ADMIN, payload:newAppState});
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
        } else  setmessage(data.message); 
      })
      .catch((error) => {
        console.log(error);
        
      });
    };
    
    const changeHandler = e => {
      switch (e.target.name) {
        case "uname":
          uname = e.target.value;
          break;
        case "pword":
          pword = (e.target.value);
          break;
          case "fname":
          lname = (e.target.value);
          break;
          case "plname":
          fname = (e.target.value);
          break;
    
        default:
          break;
      }
    };
    return (
        <div className = "registerForm main"> 
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor = "uname"> User name:{" "}</label>
                    <input type="text" required autoComplete="off" name="uname" value={uname} onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor = "fname">first name:{" "}</label>
                    <input type="text" required autoComplete="off" name="fname" value={pword} onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor = "fname">last name:{" "}</label>
                    <input type="text" required  autoComplete="off" name="lname" value={pword} onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor = "pword">password:{" "}</label>
                    <input type="password" required minLength = "6  " autoComplete="off" name="pword" value={pword} onChange={changeHandler}/>
                </div>
                <div>
                    <button className="login" type="submit">Sign Up!</button>
                    {message?<span className = "message" >{message}
                    </span>:null}
                </div>
            </form>
        </div>
    )
}

export default Register
