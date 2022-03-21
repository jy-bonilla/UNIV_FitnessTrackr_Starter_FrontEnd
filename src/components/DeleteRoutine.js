import React from "react"
import { callApi } from "../api"


const DeleteRoutine = (props) => {
    const { id } = props
    const handleDeleteRoutine = async (event) => {
        event.preventDefault()
        const results = await callApi({ url: `/routines/${id}`, method: "DELETE", token: localStorage.getItem("token") })
        console.log(results)
    }


    return (
        <div>
            <button onClick={handleDeleteRoutine}>Delete</button>
        </div>
    )
}


export default DeleteRoutine