import React, { useState } from 'react';
import { callApi } from '../api';


const EditRoutineActivity = (props) => {
    const [clicked, setClicked] = useState(false)
    const origDuration = props.origDuration
    const userRoutines = props.userRoutines
    const setUserRoutines = props.setUserRoutines
    const origCount = props.origCount
    const { id } = props
    const [count, setCount] = useState(origCount)
    const [duration, setDuration] = useState(origDuration)
    const handleCountChange = (event) => {
        setCount(event.target.value)
    }
    const handleDurationChange = (event) => {
        setDuration(event.target.value)
    }
    const handleEditRoutineActivitySubmit = async (event) => {
        event.preventDefault()
        const edits = {
            count: count,
            duration: duration
        }
        console.log("submitted")
        const results = await callApi({ url: `/routine_activities/${id}`, method: "PATCH", token: localStorage.getItem("token"), body: edits })
        setClicked(false)
        // if (results) {
        //     const newRoutines = userRoutines.filter((activity) => activity.id !== id)
        //     setUserRoutines([...newRoutines, results])
        // }
    }
    return (
        clicked ?
            <div>
                <div id="editroutine">
                    <form onSubmit={handleEditRoutineActivitySubmit}>
                        <label htmlFor='name'>Count:</label>
                        <input type='text' value={count} onChange={handleCountChange} name='name' />
                        <label htmlFor='duration'>Duration:</label>
                        <input type='text' name='duration' value={duration} onChange={handleDurationChange} />
                        <button type='submit'>Submit Edits</button>
                    </form>
                </div>
            </div> :
            <div>
                <button onClick={() => setClicked(true)}>Edit Activity</button>
            </div>
    )
}

export default EditRoutineActivity