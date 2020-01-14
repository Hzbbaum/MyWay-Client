import React from "react";
import { useSelector } from "react-redux";
import Logo from "../../assets/Logo";
import { LOGGED_OUT } from  "../../redux/appStateTypes";
import LoginForm from "./LoginForm";
import LogoutButton from "./LogoutButton";
import "./header.scss";

function Header() {
  // const [uname, setuname] = useState("");
  // const [pword, setpword] = useState("");
  const user = useSelector(state => state.user);
  const logState = useSelector(state => state.appState);
  const loggedin = logState.appState!== LOGGED_OUT;

  return (
    <div className="header">
      <div className="left">
        <Logo/>
        <h2>MY WAY</h2>
      </div>
      <div className="right">
        {loggedin? <span> hello {user.fname} {user.lname} </span>:null}
        {loggedin? <LogoutButton/>:<LoginForm/>}
      </div>
    </div>
  );
}

export default Header
