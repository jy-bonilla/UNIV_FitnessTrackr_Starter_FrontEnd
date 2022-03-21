import React from "react"
import { callApi } from "../api"


const DeleteRoutineActivity = (props) => {
    const { id } = props
    const userRoutines = props.userRoutines
    const setUserRoutines = props.setUserRoutines
    const handleDeleteRoutine = async (event) => {
        event.preventDefault()
        const results = await callApi({ url: `/routine_activities/${id}`, method: "DELETE", token: localStorage.getItem("token") })
        // if (results) {
        //     const newRoutines = userRoutines.filter((activity) => activity.id !== id)
        //     setUserRoutines([...newRoutines])
        // }
    }


    return (
        <div>
            <button onClick={handleDeleteRoutine}>Delete</button>
        </div>
    )
}


export default DeleteRoutineActivity