import axios from 'axios';
import React, {useState} from 'react';
import Routines from './Routines';
import './singleRoutine.css';

const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';

const SingleRoutine = ({routine, editable, activities}) => {

    const [currentlyEditing, setCurrentlyEditing] = useState(false);
    const [reRender, setReRender] = useState(false);

    async function addActivity(activity) {
        try {
            let newRoutineActivity = (await axios.post(`${BASE_URL}/routines/${routine.id}/activities`, {
                activityId: activity.id,
                count: activity.count,
                duration: activity.duration
            })).data;

            // gets some properties from the activity passed in and from the original array
            newRoutineActivity.name = activity.name;
            newRoutineActivity.routineActivityId = newRoutineActivity.id;
            newRoutineActivity.description = activities.filter((activity) => {
                return (activity.name === newRoutineActivity.name)
            })[0].description;
            routine.activities.push(newRoutineActivity);

            // forces re-render
            setReRender(!reRender)

            return newRoutineActivity;
        } catch (error) {
            console.error(error);
            document.getElementById("error-message").innerHTML = error.response.data.message;
        }
    }

    async function deleteActivity(activity) {
        try {
            await axios.delete(`${BASE_URL}/routine_activities/${activity.routineActivityId}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("userToken")
                }
            })

            document.getElementById(activity.routineActivityId).remove();
        } catch(error) {
            if (error.response)
            // document.getElementById("error-message").innerHTML = error.response.data.message;
            // else 
            console.error(error)
        }
    }

    async function updateRoutine(newRoutine) {
        try {
            let updatedRoutine = (await axios.patch(`${BASE_URL}/routines/${routine.id}`,
            {
                name: newRoutine.name,
                goal: newRoutine.goal,
                isPublic: newRoutine.isPublic
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("userToken")
                }
            }))
            updatedRoutine.activities = routine.activities;
            routine = updatedRoutine;

        } catch (error) {
            console.error(error);
            document.getElementById("error-message").innerHTML = error.response.data.message;
        }
    }

    async function deleteRoutine() {
        try {
            routine.activities.forEach(async (activity) => {
                console.log("activity", activity)
                await deleteActivity(activity)
            })
            let res = (await axios.delete(`${BASE_URL}/routines/${routine.id}`,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("userToken")
                }
            })).data

            document.getElementById(`single-routine-${routine.id}`).remove();
            console.log(res);
        } catch (error) {
            console.error(error);
            document.getElementById("error-message").innerHTML = error.response.data.message;
        }
    }

    return <div className="single-routine" id={`single-routine-${routine.id}`}>
        {(localStorage.getItem("username") !== routine.creatorName) ? 
        // code for when the routine was NOT made by the logged-in user
    <><h3>Name: {routine.name}</h3>
    <p>Goal: {routine.goal}</p>
    <p>Created by: {routine.creatorName}</p>
    <p>Activities:</p>
    <ol>
        {routine.activities.map((activity) => {
            return <li>{activity.name}
                <ul>
                    <li><p>{activity.description}</p></li>
                    <li><p>Duration: {activity.duration}</p></li>
                    <li><p>{activity.count} times</p></li>
                </ul>
            </li>

        })}
    </ol></>
    :
    // code for when the routine was made by the logged-in user
    <>
    {currentlyEditing ? 
        // code for editing the routine
        <>
        <h3>
            <label htmlFor="routine-name-input">Name:</label>
            <input id="routine-name-input" type="text" placeholder={routine.name}></input>
        </h3>
        <p>
            <label htmlFor="routine-goal-input">Goal:</label>
            <input id="routine-goal-input" type="text" placeholder={routine.goal}></input>
        </p>
        <p>Created by: {routine.creatorName}</p>
        <p>Activities:</p>
        <ol id={`activities-for-${routine.id}`}>
            {routine.activities.map((activity) => {
                return <li id={activity.routineActivityId}>{activity.name}
                    <ul>
                        <li><p>{activity.description}</p></li>
                        <li><p>Duration: {activity.duration}</p></li>
                        <li><p>{activity.count} times</p></li>
                    </ul>
                    <button onClick={() => {deleteActivity(activity)}}>Delete Activity</button>
                </li>

            })}
        </ol>
        <label htmlFor="routine-activities-input">Add Activity:</label>
        <input id="routine-activities-input" list="routine-activities-selection"></input>
        <datalist id="routine-activities-selection">
            {activities.map((activity, i) => {
                return <option value={activity.name} key={i}>{activity.name}</option>
            })}
        </datalist>
        <ul>
            <li><label htmlFor="count-input">Count:</label>
            <input id="count-input" type="number"></input></li>
            <li><label htmlFor="duration-input">Duration:</label>
            <input id="duration-input" type="number"></input></li>
            <button onClick={() => {

                // making the new activity using info from above
                let newActivity = activities.filter((activity) => {
                    return (activity.name === document.getElementById("routine-activities-input").value)
                })[0];

                newActivity.count = document.getElementById("count-input").value;
                newActivity.duration = document.getElementById("duration-input").value;

                newActivity.routineActivityId = addActivity(newActivity).routineActivityId;

            }}>Add Activity</button>
        </ul>
        <label htmlFor="ispublic-input">Make Public?</label>
        <input type="checkbox" id="ispublic-input"></input>
        <button onClick={() => {
            let newRoutine = {
                name: document.getElementById("routine-name-input").value,
                goal: document.getElementById("routine-goal-input").value,
                isPublic: document.getElementById("ispublic-input").checked
            }
            if (!newRoutine.name) {
                newRoutine.name = routine.name;
            }
            if (!routine.goal) {
                newRoutine.goal = routine.goal;
            }

            updateRoutine(newRoutine);
            setCurrentlyEditing(false);
        }}>Confirm Changes</button>
        <p id="error-message"></p>
        </>
        :
        // code for NOT editing the routine
        <>
        <h3>{routine.name}</h3>
        <p>Goal: {routine.goal}</p>
        <p>Created by: {routine.creatorName}</p>
        <p>Activities:</p>
        <ol>
            {routine.activities.map((activity) => {
                return <li>{activity.name}
                    <ul>
                        <li><p>{activity.description}</p></li>
                        <li><p>Duration: {activity.duration}</p></li>
                        <li><p>{activity.count} times</p></li>
                    </ul>
                </li>

            })}
        </ol>
        <p>{routine.isPublic ? "Public" : "Private"}</p>
        {/* editable is true when called from MyRoutines, false from Routines */}
        {editable ? 
        <button onClick={() => {setCurrentlyEditing(true)}}>Edit Routine</button>
        : '' }
        <button onClick={() => {deleteRoutine()}}>Delete Routine</button>
        <p id="error-message"></p>
        </>
    }
    </>}</div>
}

export default SingleRoutine;