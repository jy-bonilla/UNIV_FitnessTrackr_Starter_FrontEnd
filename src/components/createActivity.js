import React, { useState } from 'react';
import { callApi } from '../api';

const CreateActivity = (props) => {


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
            callApi({ url: "/activities", method: "POST", token: localStorage.getItem("token"), body: data })
        } else {
            alert("Activity " + name + " already exists")
        }
        setName("")
        setDescription("")
    }
    // loadedActivities.map(item => {
    //     if (item.name.toLowerCase() === name.toLowerCase()) {
    //         console.log(name + " already exists")
    //     }
    //     console.log("test")
    //     return name
    // })

    // async function createActivity(data) {
    //     try {
    //         const response = await fetch(`${API}/activities`, {
    //             method: "POST",
    //             body: JSON.stringify(
    //                 data
    //             )
    //         });
    //         const result = await response.json();
    //         return result
    //     } catch (error) {
    //         throw error
    //     }
    // }
    const handleMessageChange = (event) => {
        setName(event.target.value)
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    return (
        <div id="createactivity">
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


export default CreateActivity