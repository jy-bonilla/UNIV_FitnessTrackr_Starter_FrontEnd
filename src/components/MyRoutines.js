import React from "react";
import RoutineForm from "./RoutineForm";
import { useEffect, useState } from "react"
import { callApi } from "../api";
import { EditRoutine } from "./";
import DeleteRoutine from "./DeleteRoutine";


const MyRoutines = (props) => {

    const signedIn = props.signedIn
    // const myRoutines = routines.filter(routine => user.id === routine.creatorId);
    const [userRoutines, setUserRoutines] = useState([])
    const [username, setUsername] = useState([])

    useEffect(() => {
        callApi({ url: "/users/me", token: localStorage.getItem("token") }).then(result => {
            setUsername(result.username)
            getUserRoutines(result.username)
        }).catch(error => {
            console.error(error)
        })
    }, []);

    const getUserRoutines = async (username) => {
        const data = await callApi({ url: `/users/${username}/routines` })
        setUserRoutines(data)
    }




    return <div>
        <h1 className='header'>My Routines</h1>
        {
            signedIn && localStorage.getItem("token") ? <div className="createActivityForm"><h3>Create a Routine</h3><RoutineForm /> </div> : <></>
        }
        {userRoutines ?
            userRoutines.map(myRoutine => <div key={myRoutine.id}>
                <h2>{myRoutine.name}</h2>
                <h4>Goal: {myRoutine.goal}</h4>
                <EditRoutine userRoutines={userRoutines} setUserRoutines={setUserRoutines} origName={myRoutine.name} origGoal={myRoutine.goal} id={myRoutine.id} />
                <DeleteRoutine />
                {myRoutine.activities.map((activity, index) => <div key={activity.id}>
                    <h3>Activity {index + 1}</h3>
                    <p>Name:{activity.name}</p>
                    <p>Description:{activity.description}</p>
                    <p>Duration:{activity.duration}</p>
                    <p>Count:{activity.count}</p>
                </div>)} </div>)
            : <p>No Routines to display</p>}

    </div>
}

export default MyRoutines;