import React, { useEffect } from 'react'
import NewVacationForm from "./newVacationForm";
import { useSelector } from 'react-redux'
import { LOGGED_IN, LOGGED_OUT, ADMIN } from '../../redux/appStateTypes';
import { Redirect } from 'react-router-dom';
import TripAdmin from "./TripAdmin";
import AdminChart from './AdminChart';

const Admin = () => {
    
    const appstate = useSelector(state => state.appState);
    const trips = useSelector(state => state.trips.trips);
    const barChartData = [];
    const barChartLabels = [];

    useEffect(() => {
        if (trips && trips.length)
        {   
            trips.forEach( (trip) => {
                if (trip.followers_num) {
                    barChartLabels.push(trip.vacation_id);
                    barChartData.push(trip.followers_num);
                }
            })
        }
    }, [trips, barChartData, barChartLabels])

    let route;
    switch (appstate.appState) {
        case LOGGED_IN:
            route = <Redirect exact to ="/trips"/>;
            break;
        case LOGGED_OUT:
            route = <Redirect exact to = "/home"/>;
            break;
        case ADMIN:
            route = null;
            break;
        default:
            break;
    }

    return (
        <div className = "main">
            {route}
            <NewVacationForm/>
            { trips && trips.length && !route && trips.map(trip=><TripAdmin tripinfo = {trip} key = {trip.vacation_id}/>)}
            <div className = "showReport"><i className="material-icons">show_chart</i></div>
            <AdminChart/>
	    </div>
    )
}

export default Admin;
