import React, { useState } from 'react';
import { callApi } from '../api';

const CreateActivity = (props) => {

    const setLoadedActivities = props.setLoadedActivities
    const loadedActivities = props.loadedActivities
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const handleCreateActivitySubmit = async (event) => {
        event.preventDefault()
        console.log(name)
        console.log(description)
        const newActivity = loadedActivities.filter((activity) => name === activity.name)
        console.log(newActivity)
        if (!newActivity.length) {
            const data = {
                name: name,
                description: description
            }
            const results = await callApi({ url: "/activities", method: "POST", token: localStorage.getItem("token"), body: data })
            setLoadedActivities([...loadedActivities, results])
        } else {
            alert("Activity " + name + " already exists")
        }
        setName("")
        setDescription("")
    }
    const handleMessageChange = (event) => {
        setName(event.target.value)
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    return (
        <div id="createactivity" className="createActivityForm">
            <h1>Create an Activity</h1>
            <form onSubmit={handleCreateActivitySubmit}>
                <label htmlFor='name'>Name:</label>
                <input type='text' value={name} onChange={handleMessageChange} name='name' />
                <label htmlFor='description'>Description:</label>
                <input type='text' name='description' value={description} onChange={handleDescriptionChange} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}


export default CreateActivity;