import React from "react";
import RoutineForm from "./RoutineForm";
import { useEffect, useState } from "react"
import { callApi } from "../api";


const MyRoutines = (props) => {
    const signedIn = props.signedIn
    // const myRoutines = routines.filter(routine => user.id === routine.creatorId);
    const [userRoutines, setUserRoutines] = useState([])

    useEffect(() => {
        callApi({ url: "/users/me", token: localStorage.getItem("token") }).then(result => {
            callApi({ url: `/users/${result.username}/routines` })
        }).then(result => {
            setUserRoutines(result)
        })
    }, []);


    return <div>
        <h1 className='header'>My Routines Page</h1>
        {
            signedIn && localStorage.getItem("token") ? <RoutineForm /> : <></>
        }
        {/* {
            myRoutines.map(myRoutine => <div key={myRoutine.id}> {myRoutine.name}, {myRoutine.goal}:
                {myRoutine.activities.map(activity => <div key={activity.id}> {activity.name}, {activity.description}, {activity.duration}, {activity.count} </div>)} </div>)
        } */}
    </div>
}

export default MyRoutines;