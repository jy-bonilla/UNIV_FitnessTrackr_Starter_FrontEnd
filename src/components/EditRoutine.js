import React, { useState } from 'react';
import { callApi } from '../api';


const EditRoutine = (props) => {
    const [clicked, setClicked] = useState(false)
    const origGoal = props.origGoal
    const userRoutines = props.userRoutines
    const setUserRoutines = props.setUserRoutines
    const origName = props.origName
    const { id } = props
    const [name, setName] = useState(origName)
    const [goal, setGoal] = useState(origGoal)
    const handleMessageChange = (event) => {
        setName(event.target.value)
    }
    const handleGoalChange = (event) => {
        setGoal(event.target.value)
    }
    const handleEditRoutineSubmit = async (event) => {
        event.preventDefault()
        const edits = {
            name: name,
            goal: goal
        }
        console.log("submitted")
        const results = await callApi({ url: `/routines/${id}`, method: "PATCH", token: localStorage.getItem("token"), body: edits })
        setClicked(false)
        // if (results) {
        //     const newRoutines = userRoutines.filter((activity) => activity.id !== id)
        //     newRoutines.unshift(results)
        //     console.log(newRoutines)
        //     // setUserRoutines([...newRoutines])
        // }
    }
    return (
        clicked ?
            <div>
                <div id="editroutine">
                    <form onSubmit={handleEditRoutineSubmit}>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' value={name} onChange={handleMessageChange} name='name' />
                        <label htmlFor='goal'>Goal:</label>
                        <input type='text' name='goal' value={goal} onChange={handleGoalChange} />
                        <button type='submit'>Submit Edits</button>
                    </form>
                </div>
            </div> :
            <div>
                <button onClick={() => setClicked(true)}>Edit Routine</button>
            </div>
    )
}

export default EditRoutine