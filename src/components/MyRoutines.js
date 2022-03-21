import React from "react";
import RoutineForm from "./RoutineForm";
import { useEffect, useState } from "react"
import { callApi } from "../api";
import { EditRoutine } from "./";
import DeleteRoutine from "./DeleteRoutine";
import EditRoutineActivity from "./EditRoutineActivity";
import DeleteRoutineActivity from "./DeleteRoutineActivity";
import AddActivity from "./AddActivity";


const MyRoutines = (props) => {
    const loadedActivities = props.loadedActivities
    const setLoadedActivities = props.setLoadedActivities

    const signedIn = props.signedIn

    // const myRoutines = routines.filter(routine => user.id === routine.creatorId);
    const [userRoutines, setUserRoutines] = useState([])
    const [username, setUsername] = useState("")
    useEffect(() => {
        callApi({ url: "/users/me", token: localStorage.getItem("token") }).then(result => {
            setUsername(result.username)
            callApi({ url: `/users/${result.username}/routines` }).then(results => {
                setUserRoutines(results)
            })

        }).catch(error => {
            console.error(error)
        })
    }, []);

    // useEffect(() => {
    //     callApi({ url: `/users/${username}/routines` }).then(result => {
    //         setUserRoutines(result)
    //     }).catch(error => {
    //         console.error(error)
    //     })
    // }, [username]);

    // const getUserRoutines = async (username) => {
    //     const data = await callApi({ url: `/users/${username}/routines` })
    //     setUserRoutines(data)
    // }




    return <div>
        <h1 className='header'>My Routines</h1>
        {
            signedIn && localStorage.getItem("token") ? <div className="createActivityForm"><RoutineForm userRoutines={userRoutines} setUserRoutines={setUserRoutines} /> </div> : <></>
        }
        {userRoutines ?
            userRoutines.map((item, index) => <div key={item.id}>
                <h2>{item.name}</h2>
                <h4>Goal: {item.goal}</h4>
                <AddActivity id={item.id} loadedActivities={loadedActivities} setLoadedActivities={setLoadedActivities} />
                <EditRoutine userRoutines={userRoutines} setUserRoutines={setUserRoutines} origName={item.name} origGoal={item.goal} id={item.id} />
                <DeleteRoutine userRoutines={userRoutines} setUserRoutines={setUserRoutines} id={item.id} />
                {item.activities.map((activity, index) => <div key={activity.id}>
                    <h3>Activity {index + 1}</h3>
                    <p>Name:{activity.name}</p>
                    <p>Description:{activity.description}</p>
                    <p>Duration:{activity.duration}</p>
                    <p>Count:{activity.count}</p>
                    <EditRoutineActivity userRoutines={userRoutines} setUserRoutines={setUserRoutines} origCount={activity.count} origDuration={activity.duration} id={activity.routineActivityId} />
                    <DeleteRoutineActivity id={activity.routineActivityId} />
                </div>)} </div>)
            : <p>No Routines to display</p>}

    </div>
}

export default MyRoutines;