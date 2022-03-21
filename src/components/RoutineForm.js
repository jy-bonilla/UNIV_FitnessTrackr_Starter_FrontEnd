
import React, { useState } from 'react';
import { callApi } from '../api';

const RoutineForm = (props) => {

    const userRoutines = props.userRoutines
    const setUserRoutines = props.setUserRoutines
    const [name, setName] = useState("")
    const [goal, setGoal] = useState("")
    const handleCreateRoutineSubmit = async (event) => {
        event.preventDefault()
        const data = {
            name: name,
            goal: goal,
            isPublic: true
        }
        const results = await callApi({ url: "/routines", method: "POST", token: localStorage.getItem("token"), body: data })
        // if (results) {
        //     // setUserRoutines([...userRoutines, results])
        // }
        // else {
        //     alert("Could not create Routine, try a different name" + results.error)
        // }
        setName("")
        setGoal("")
    }
    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleGoalChange = (event) => {
        setGoal(event.target.value)
    }
    return (
        <div id="createactivity" className="createActivityForm">
            <h1>Create a Routine</h1>
            <form onSubmit={handleCreateRoutineSubmit}>
                <label htmlFor='name'>Name:</label>
                <input type='text' value={name} onChange={handleNameChange} name='name' />
                <label htmlFor='goal'>Goal:</label>
                <input type='text' name='goal' value={goal} onChange={handleGoalChange} />
                <button type='submit'>Submit New Routine</button>
            </form>
        </div>
    )
}



export default RoutineForm;