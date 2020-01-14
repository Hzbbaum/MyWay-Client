import React, { useEffect } from 'react'

const TripAdmin = (trip) => {
    let destination = trip.tripinfo.destination;
    let description = trip.tripinfo.description;
    let sdate = trip.tripinfo.sdate;
    let edate = trip.tripinfo.edate;
    let pic = trip.tripinfo.pic;
    let price_usd = trip.tripinfo.price_usd;
    let aToken;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{aToken = localStorage.getItem("accessToken")})
    
    const submitHandler = e => {
    e.preventDefault();
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    e.target[3].value = ""
    e.target[4].value = "";
    e.target[5].value = ""
    const body = {};
    body.destination = destination;
    body.description = description;
    body.price_usd = price_usd;
    body.pic = pic;
    body.edate = edate;
    body.sdate = sdate;
    fetch('http://localhost:3000/vacations', {
    method: 'POST', 
    headers: {
        'Authorization':"Bearer " + aToken,
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
    } 
    })
    .catch((error) => {
    console.log(error);
    });
    };

    const deleteHandler = e => {
        e.preventDefault();
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";
        e.target[3].value = ""
        e.target[4].value = "";
        e.target[5].value = ""
        const body = {};
        body.destination = destination;
        body.description = description;
        body.price_usd = price_usd;
        body.pic = pic;
        body.edate = edate;
        body.sdate = sdate;
        fetch('http://localhost:3000/vacations', {
        method: 'DELETE', 
        headers: {
            'Authorization':"Bearer " + aToken,
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
        } 
        })
        .catch((error) => {
        console.log(error);
        });
        };

    const changeHandler = e => {
        switch (e.target.name) {
            case "destination":
                destination = e.target.value;
                break;
            case "description":
                description = (e.target.value);
                break;
            case "price_usd":
                price_usd = (e.target.value);
                break;
            case "pic":
                pic = (e.target.value);
                break;
            case "sdate":
                sdate = (e.target.value);
                break;
            case "edate":
                edate = (e.target.value);
                break;
            default:
                break;
        }       
    };      

    return (
        <div className = "existingVacationForm"> 
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor = "destination"> destination:{" "}</label>
                    <input type="text" required autoComplete="off" name="uname" value={destination} onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor = "description">description:{" "}</label>
                    <textarea required autoComplete="off" name="fname" value={description} onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor = "pic">pic url:{" "}</label>
                    <input type="text" required  autoComplete="off" name="pic" value={pic} onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor = "price_usd">price ($):{" "}</label>
                    <input type="number" required autoComplete="off" name="pword" value={price_usd} onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor = "sdate">start date:{" "}</label>
                    <input type="date" required autoComplete="off" name="sdate" value={sdate} onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor = "edate">end date:{" "}</label>
                    <input type="date" required autoComplete="off" name="edate" value={edate} onChange={changeHandler}/>
                </div>
                <div>
                    <button className="editVacation" type="submit"><i className="material-icons">edit</i></button>
                    <button className="editVacation" onClick = {deleteHandler}><i className="material-icons">delete</i></button>
                </div>
            </form>
        </div>
    )
}
export default TripAdmin;