import React from 'react'
import { useSelector } from 'react-redux'
import { LOGGED_IN, LOGGED_OUT } from '../redux/appStateTypes';
import { Redirect, Link } from 'react-router-dom';
import "./home.scss"
const Home = () => {
    
    const appstate = useSelector(state => state.appState);
    let route;
    switch (appstate) {
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
        <div className="main">
          {route}
          <div className="home-wrapper">
            <main>
              <p>
                <b>MY WAY</b> Gets You On Vacation, Now.
              </p>
              Join Us and see!<p></p>
            </main>
            <Link className="link" to="/register">
              Join Now!
            </Link>
          </div>
        </div>
      );
    };
export default Home
