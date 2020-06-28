import React from 'react'
import { useSelector } from 'react-redux'
import { LOGGED_IN, LOGGED_OUT } from '../redux/appStateTypes';
import { Redirect, Link } from 'react-router-dom';

const Home = () => {
    
    const appstate = useSelector(state => state.appState);
    let route;
    switch (appstate.appState) {
        case LOGGED_IN:
            route = <Redirect exact to ="/trips"/>;
            break;
        case LOGGED_OUT:
            route = null;
            break;
        default:
            break;
    }

    return (
        <div className = "main">
            {route}
            <button><Link to = "/register">Register</Link></button>
        </div>
    )
}

export default Home
