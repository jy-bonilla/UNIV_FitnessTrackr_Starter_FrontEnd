import axios from 'axios';
import React, {useState } from 'react';


const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';

const RoutineForm = ({setRoutinesToDisplay, routinesToDisplay, activities, setActivities}) => {

    const [activitiesToAdd] = useState([]);

    async function createRoutine() {
        let routine = {
            name: document.getElementById("routine-name-input").value,
            goal: document.getElementById("routine-goal-input").value,
            isPublic: document.getElementById("routine-ispublic-input").checked,
            activities: activitiesToAdd,
            creatorName: localStorage.getItem("username")
        }

        try {
            let createdRoutine = (await axios.post(`${BASE_URL}/routines`,
            {
                name: routine.name,
                goal: routine.goal,
                isPublic: routine.isPublic
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("userToken")
                }
            })).data;

            routine.id = createdRoutine.id;
            routine.creatorId = createdRoutine.creatorId;

            activitiesToAdd.forEach(async (activity) => {
                let addedActivity = (await axios.post(`${BASE_URL}/routines/${createdRoutine.id}/activities`,
                {
                    activityId: activity.id,
                    count: activity.count,
                    duration: activity.duration
                })).data;

                activity.id = addedActivity.id;
                activity.routineActivityId = addedActivity.id;
            })

            
            // updates the routines 
            setRoutinesToDisplay(routinesToDisplay.concat([routine]))

            document.getElementById("response-message").innerHTML = "Routine successfully created!";
        } catch (error){
            if (error.response)
                document.getElementById("response-message").innerHTML = error.response.data.message;
            else 
                console.error(error);
        }
    }

    return <div id="creation-form">
        <div id="name-input">
            <label htmlFor="routine-name-input">Routine Name:</label>
            <input type="text" id="routine-name-input"></input>
        </div>
        <div id="goal-input">
            <label htmlFor="routine-goal-input">Routine Goal:</label>
            <input type="text" id="routine-goal-input"></input>
        </div>
        <div id="ispublic-input">
            <label htmlFor="routine-ispublic-input">Make Public?</label>
            <input type="checkbox" id="routine-ispublic-input"></input>
        </div>
        <h4>Add Activities</h4>
        <div id="activities-input">
            <label htmlFor="routine-activities-input">Activity:</label>
            <input id="selected-activity" list="routine-activities-input" name="routine-activities-input"></input>
            <datalist id="routine-activities-input">
                {activities.map((activity, i) => {
                    return <option value={activity.name} key={i}>{activity.name}</option>
                })}
            </datalist>
            <label htmlFor="count-input">Count:</label>
            <input id="count-input" type="number"></input>
            <label htmlFor="duration-input">Duration:</label>
            <input id="duration-input" type="number"></input>
            
            <button onClick={() => {
                // activity to be added to routine
                let currentActivityName = document.getElementById("selected-activity").value;

                let currentActivity = activities.filter((activity) => {
                    return (activity.name === currentActivityName)
                })[0];

                currentActivity.count = document.getElementById("count-input").value;
                currentActivity.duration = document.getElementById("duration-input").value;
                
                // user activity
                document.getElementById("activities-to-add-list").innerHTML += `
                    <li>${currentActivityName}
                        <ul>
                            <li>count: ${currentActivity.count}</li>
                            <li>duration: ${currentActivity.duration}</li>
                        </ul>
                    </li>`;

                activitiesToAdd.push(currentActivity)
                console.log(activitiesToAdd)
            }}>Add Activity</button>
            <p>Current activities on this Routine:</p>
            <ol id="activities-to-add-list">
            </ol>
        </div>
        <button onClick={() => createRoutine()}>Create Routine</button>
        <p id="response-message"></p>
    </div>
}

export default RoutineForm;
