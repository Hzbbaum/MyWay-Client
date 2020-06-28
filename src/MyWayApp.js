import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from "./components/HeaderComponents/Header";
import Footer from './components/Footer';
import Home from "./components/Home";
import Trips from "./components/TripsComponent/Trips";
import Page404 from './components/Page404';
import Register from './components/Register';

import bgImg from '../src/assets/anotherbeach.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { LOGGED_OUT, LOGGED_IN } from './redux/appStateTypes';
import { UPDATE_TRIPS } from './redux/actionTypes';

function MyWayApp() {

  const user_id = useSelector(state=> state.user.user_id);
  const trips = useSelector(state=> state.trip);
  const appstate = useSelector(state=> state.appState);

  const dispatch = useDispatch();
  // on load, we fetch all trips for the user (sorted by the server so that followed should be first)
  useEffect(()=>{
    let aToken = null;
    setTimeout( ()=>
    {if (appstate === LOGGED_OUT) 
      aToken = null;
    else  
      aToken = localStorage.getItem("accessToken");
    }, 10);
    // a bad solution to a async problem - the token is being returned as null because we are sending it before it could be retrieved
    if (appstate.appState === LOGGED_IN)  {
    setTimeout(() => {
      fetch('http://localhost:3000/vacations', {
        method: 'GET', 
        headers: {
          'Authorization':"Bearer " + aToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user_id),
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
      .then(data => {
        if ((data.success) && !tripsCompare(data.results, trips)){ 
          dispatch({type:UPDATE_TRIPS, payload:data.results})
        };
      })
      }, 100);
    };
      // we would like to update this if user_id changes. dispatch is just here so the eslint dosen't whine.
  },[user_id, dispatch, appstate, trips]);
  
  return (
    <div className="App">
      <img className = "background" src = {bgImg} alt = "beach"/>
        <Header/>
        <BrowserRouter>
          <Switch>
            <Route  path = "/home"><Home/></Route>
            <Route  path = "/trips"><Trips/></Route>
            <Route  path = "/register"><Register/></Route>
            <Route  exact path = "/"><Home/></Route>
            <Route  path = "*"><Page404/></Route>
          </Switch>
        </BrowserRouter>
        <Footer/>
    </div>
  );
}

export default MyWayApp;

function tripsCompare(tripsNew, tripsState){
  if (!Array.isArray(tripsNew)|| !Array.isArray(tripsState)) return false;
  if (tripsNew.length !== tripsState.length) return false;
  for (let i = 0; i < tripsNew.length;i++){
    if  (JSON.stringify(tripsState[i]) !== JSON.stringify(tripsNew[i])) return false;
  } 
  return true;
}