import React, { useState } from 'react';
import { callApi } from '../api';


const EditActivity = (props) => {
    const [clicked, setClicked] = useState(false)
    const origDescription = props.origDescription
    const loadedActivities = props.loadedActivities
    const setLoadedActivities = props.setLoadedActivities
    const origName = props.origName
    const { id } = props
    const [name, setName] = useState(origName)
    const [description, setDescription] = useState(origDescription)
    const handleMessageChange = (event) => {
        setName(event.target.value)
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const handleEditActivitySubmit = async (event) => {
        event.preventDefault()
        const edits = {
            name: name,
            description: description
        }
        console.log("submitted")
        const results = await callApi({ url: `/activities/${id}`, method: "PATCH", token: localStorage.getItem("token"), body: edits })
        setClicked(false)
        if (results) {
            const newActivities = loadedActivities.filter((activity) => activity.id !== id)
            setLoadedActivities([...newActivities, results])
        }
    }
    return (
        clicked ?
            <div>
                <div className="editActivty-Options" id="editactivity">
                    <form onSubmit={handleEditActivitySubmit}>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' value={name} onChange={handleMessageChange} name='name' />
                        <label htmlFor='description'>Description:</label>
                        <input type='text' name='description' value={description} onChange={handleDescriptionChange} />
                        <button type='submit'>Submit Edits</button>
                    </form>
                </div>
            </div> :
            <div id="editactivity">
                <button onClick={() => setClicked(true)}>Edit Activity</button>
            </div>
    )
}

export default EditActivity