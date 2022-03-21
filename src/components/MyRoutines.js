import React from "react";
import RoutineForm from "./RoutineForm";
import { useEffect, useState } from "react"
import { callApi } from "../api";


const MyRoutines = (props) => {
    const signedIn = props.signedIn
    // const myRoutines = routines.filter(routine => user.id === routine.creatorId);
    const [userRoutines, setUserRoutines] = useState([])
    const [username, setUsername] = useState([])
    useEffect(() => {
        callApi({ url: "/users/me", token: localStorage.getItem("token") }).then(result => {
            setUsername(result.username)
        }).catch(error => {
            console.error(error)
        })
    }, []);

    useEffect(() => {
        callApi({ url: `/users/${username}/routines` }).then(result => {
            setUserRoutines(result)
        }).catch(error => {
            console.error(error)
        })
    }, [username]);

    return <div>
        <h1 className='header'>My Routines Page</h1>
        {
            signedIn && localStorage.getItem("token") ? <RoutineForm /> : <></>
        }
        {/* {userRoutines ?
            userRoutines.map(myRoutine => <div key={myRoutine.id}> {myRoutine.name}, {myRoutine.goal},
                {userRoutines.activities.map(activity => <div key={activity.id}> {activity.name}, {activity.description}, {activity.duration}, {activity.count} </div>)} </div>)
            : <p>Hello</p>} */}

    </div>
}

export default MyRoutines;