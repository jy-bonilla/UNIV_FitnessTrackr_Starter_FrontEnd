import React, { useState } from 'react';
const API = 'https://fitnesstrac-kr.herokuapp.com/api'

const CreateActivity = (props) => {


    const loadedActivities = props.loadedActivities
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const handleCreateActivitySubmit = async (event) => {
        event.preventDefault()
        console.log(name)
        console.log(description)
        loadedActivities.map(item => {
            if (item.name.toLowerCase() === name.toLowerCase()) {
                console.log(name + "already exists")
            } else {
                const body = {
                    name: name,
                    description: description
                }
                const data = createActivity(body)
                console.log(data)
            }
        })
    }
    async function createActivity(data) {
        try {
            const response = await fetch(`${API}/activities`, {
                method: "POST",
                body: JSON.stringify(
                    data
                )
            });
            const result = await response.json();
            return result
        } catch (error) {
            throw error
        }
    }
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