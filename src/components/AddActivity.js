import React, { useState } from "react"
import { callApi } from "../api"


const AddActivity = (props) => {
    const { id } = props
    const loadedActivities = props.loadedActivities
    const setLoadedActivities = props.setLoadedActivities

    const [count, setCount] = useState()
    const [activityID, setActivityID] = useState()
    const [duration, setDuration] = useState()
    const handleCountChange = (event) => {
        setCount(event.target.value)
    }
    const handleDurationChange = (event) => {
        setDuration(event.target.value)
    }
    const handleIdChange = (event) => {
        setActivityID(event.target.value)
    }
    const handleAddActivity = async (event) => {
        event.preventDefault()
        const edits = {
            activityId: activityID,
            count: count,
            duration: duration
        }
        console.log("submitted")
        const results = await callApi({ url: `/routines//${id}/activities`, method: "POST", token: localStorage.getItem("token"), body: edits })

        // if (results) {
        //     const newRoutines = userRoutines.filter((activity) => activity.id !== id)
        //     setUserRoutines([...newRoutines, results])
        // }
    }



    return (
        <div>
            <form onSubmit={handleAddActivity}>
                <label htmlFor='name'>Count:</label>
                <input type='text' value={count} onChange={handleCountChange} name='name' />
                <label htmlFor='duration'>Duration:</label>
                <input type='text' name='duration' value={duration} onChange={handleDurationChange} />
                <select onChange={handleIdChange}>
                    {loadedActivities.map(item =>
                        <option value={item.id}>{item.name}</option>)}
                </select>
                <button type='submit'>Submit</button>

            </form>
        </div>
    )
}


export default AddActivity